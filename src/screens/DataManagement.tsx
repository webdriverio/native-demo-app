import {useFocusEffect} from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import {openDatabaseAsync, type SQLiteDatabase} from 'expo-sqlite';
import React, {useCallback, useState} from 'react';
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {Input} from 'react-native-elements';
import Button from '../components/Button';
import {STATUS_BAR_HEIGHT} from '../components/StatusBar';
import TitleDivider from '../components/TitleDivider';
import Colors from '../config/Colors';
import {testProperties} from '../config/TestProperties';

const SECURE_STORE_KEY = 'wdio_demo_secure_value';
const SQLITE_DB = 'wdio_data_management.db';

/** Same on-disk / clearApp lifecycle as @react-native-async-storage/async-storage (demo uses SQLite). */
const SQL_ASYNC_TABLE = 'demo_async_kv';
/** Dedicated SQLite table for the SQL API demo. */
const SQL_TABLE = 'demo_single';

/** One connection per app process, avoids close/reopen races (tabs, Strict Mode). */
let dataDbPromise: Promise<SQLiteDatabase> | null = null;

async function ensureDataManagementDb(): Promise<SQLiteDatabase> {
  if (!dataDbPromise) {
    dataDbPromise = (async () => {
      const db = await openDatabaseAsync(SQLITE_DB);
      // Separate statements: some Android SQLite builds are flaky with multi-statement exec.
      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS ${SQL_ASYNC_TABLE} (
          id INTEGER PRIMARY KEY CHECK (id = 1),
          value TEXT NOT NULL
        );
      `);
      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS ${SQL_TABLE} (
          id INTEGER PRIMARY KEY CHECK (id = 1),
          value TEXT NOT NULL
        );
      `);
      return db;
    })().catch(e => {
      dataDbPromise = null;
      throw e;
    });
  }
  return dataDbPromise;
}

function DataManagementScreen() {
  const isDarkMode = useColorScheme() === 'dark';
  const bg = isDarkMode ? Colors.dark : Colors.lighter;
  const fg = isDarkMode ? Colors.white : Colors.black;
  const muted = isDarkMode ? Colors.light : Colors.dark;

  const [memoryInput, setMemoryInput] = useState('');
  const [memoryValue, setMemoryValue] = useState('');

  const [asyncInput, setAsyncInput] = useState('');
  const [asyncValue, setAsyncValue] = useState('');

  const [sqliteInput, setSqliteInput] = useState('');
  const [sqliteValue, setSqliteValue] = useState('');

  const [secureInput, setSecureInput] = useState('');
  const [secureValue, setSecureValue] = useState('');

  // Reload from disk whenever this tab is focused (cold start + return from other tabs).
  useFocusEffect(
    useCallback(() => {
      let cancelled = false;

      const loadSecure = async () => {
        try {
          const s = await SecureStore.getItemAsync(SECURE_STORE_KEY);
          if (!cancelled) {
            setSecureValue(s ?? '');
          }
        } catch (e) {
          if (__DEV__) {
            console.warn('[DataManagement] SecureStore load failed', e);
          }
        }
      };

      const loadSqlite = async () => {
        try {
          const db = await ensureDataManagementDb();
          const asyncRows = await db.getAllAsync(
            `SELECT value FROM ${SQL_ASYNC_TABLE} WHERE id = 1`,
          );
          const sqlRows = await db.getAllAsync(
            `SELECT value FROM ${SQL_TABLE} WHERE id = 1`,
          );
          if (cancelled) {
            return;
          }
          const a = asyncRows[0] as Record<string, unknown> | undefined;
          const b = sqlRows[0] as Record<string, unknown> | undefined;
          setAsyncValue(pickTextColumn(a ?? null));
          setSqliteValue(pickTextColumn(b ?? null));
        } catch (e) {
          if (!cancelled) {
            Alert.alert('Database load failed', String(e));
          }
        }
      };

      void loadSecure();
      void loadSqlite();

      return () => {
        cancelled = true;
      };
    }, []),
  );

  const saveMemory = () => {
    setMemoryValue(memoryInput);
  };
  const clearMemory = () => {
    setMemoryInput('');
    setMemoryValue('');
  };

  const saveAsync = async () => {
    try {
      const db = await ensureDataManagementDb();
      await db.runAsync(
        `INSERT OR REPLACE INTO ${SQL_ASYNC_TABLE} (id, value) VALUES (1, ?)`,
        [asyncInput],
      );
      setAsyncValue(asyncInput);
    } catch (e) {
      Alert.alert('Persisted KV', String(e));
    }
  };
  const clearAsync = async () => {
    try {
      const db = await ensureDataManagementDb();
      await db.runAsync(`DELETE FROM ${SQL_ASYNC_TABLE} WHERE id = 1`);
      setAsyncInput('');
      setAsyncValue('');
    } catch (e) {
      Alert.alert('Persisted KV', String(e));
    }
  };

  const saveSqlite = async () => {
    try {
      const db = await ensureDataManagementDb();
      await db.runAsync(
        `INSERT OR REPLACE INTO ${SQL_TABLE} (id, value) VALUES (1, ?)`,
        [sqliteInput],
      );
      setSqliteValue(sqliteInput);
    } catch (e) {
      Alert.alert('SQLite', String(e));
    }
  };
  const clearSqlite = async () => {
    try {
      const db = await ensureDataManagementDb();
      await db.runAsync(`DELETE FROM ${SQL_TABLE} WHERE id = 1`);
      setSqliteInput('');
      setSqliteValue('');
    } catch (e) {
      Alert.alert('SQLite', String(e));
    }
  };

  const saveSecure = async () => {
    try {
      const opts =
        Platform.OS === 'ios'
          ? {keychainAccessible: SecureStore.WHEN_UNLOCKED}
          : undefined;
      await SecureStore.setItemAsync(SECURE_STORE_KEY, secureInput, opts);
      setSecureValue(secureInput);
    } catch (e) {
      Alert.alert('SecureStore', String(e));
    }
  };
  const clearSecure = async () => {
    try {
      await SecureStore.deleteItemAsync(SECURE_STORE_KEY);
      setSecureInput('');
      setSecureValue('');
    } catch (e) {
      Alert.alert('SecureStore', String(e));
    }
  };

  const memoryReadoutText =
    memoryValue === '' ? '— empty —' : memoryValue;
  const asyncReadoutText =
    asyncValue === '' ? '— nothing saved yet —' : asyncValue;
  const sqliteReadoutText =
    sqliteValue === '' ? '— nothing saved yet —' : sqliteValue;
  const secureReadoutText =
    secureValue === '' ? '— nothing saved yet —' : secureValue;

  return (
    <ScrollView
      style={[styles.container, {backgroundColor: bg}]}
      keyboardShouldPersistTaps="handled"
      {...testProperties('DataManagement-screen')}>
      <TitleDivider text="Data management" />

      <Text style={[styles.lead, {color: muted}]}>
        Use this screen to see how values behave for in-memory state, persisted
        app storage, and secure storage. Handy for Appium / mobile:clearApp
        expectations.
      </Text>

      <Text style={[styles.sectionTitle, {color: fg}]}>1. In-memory</Text>
      <Text style={[styles.hint, {color: muted}]}>
        Clears when the process ends (force-stop, swipe away, or OS kills the
        app). Not cleared by navigating away.
      </Text>
      <View style={[styles.card, {borderColor: Colors.orange}]}>
        <Input
          label="Type a value (not saved to disk)"
          value={memoryInput}
          onChangeText={setMemoryInput}
          placeholder="Type and save to RAM"
          labelStyle={{color: fg}}
          inputStyle={{color: fg}}
        />
        <View
          style={[
            styles.valueReadout,
            {
              borderColor: Colors.orange,
              backgroundColor: isDarkMode
                ? 'rgba(255, 149, 0, 0.12)'
                : 'rgba(255, 149, 0, 0.1)',
            },
          ]}>
          <Text style={[styles.valueReadoutCaption, {color: muted}]}>
            ▼ Current value (RAM only, lost after app is killed)
          </Text>
          <Text
            {...readoutTestProps('data-memory-readout', memoryReadoutText)}
            style={[styles.valueReadoutText, {color: fg}]}>
            {memoryReadoutText}
          </Text>
        </View>
        <View style={styles.row}>
          <Button
            text="Save (memory)"
            testID="data-memory-save"
            onPress={saveMemory}
            backgroundColor={Colors.orange}
            textStyle={{color: Colors.white}}
          />
          <Button
            text="Clear"
            testID="data-memory-clear"
            onPress={clearMemory}
            backgroundColor={Colors.light}
          />
        </View>
      </View>

      <Text style={[styles.sectionTitle, {color: fg}]}>
        2. Persisted key-value (AsyncStorage tier)
      </Text>
      <Text style={[styles.hint, {color: muted}]}>
        Same lifecycle as AsyncStorage, cleared with mobile:clearApp (Android),
        or by removing app data / reinstall. This demo stores one row in SQLite
        so it runs without linking @react-native-async-storage.
      </Text>
      <View style={[styles.card, {borderColor: Colors.orange}]}>
        <Input
          label="Type a value, then tap Save"
          value={asyncInput}
          onChangeText={setAsyncInput}
          placeholder="Persisted key/value"
          labelStyle={{color: fg}}
          inputStyle={{color: fg}}
        />
        <View
          style={[
            styles.valueReadout,
            {
              borderColor: Colors.orange,
              backgroundColor: isDarkMode
                ? 'rgba(255, 149, 0, 0.12)'
                : 'rgba(255, 149, 0, 0.1)',
            },
          ]}>
          <Text style={[styles.valueReadoutCaption, {color: muted}]}>
            ▼ Last saved value (read from disk, still here after close app →
            reopen → open this tab)
          </Text>
          <Text
            {...readoutTestProps('data-async-readout', asyncReadoutText)}
            style={[styles.valueReadoutText, {color: fg}]}>
            {asyncReadoutText}
          </Text>
        </View>
        <View style={styles.row}>
          <Button
            text="Save"
            testID="data-async-save"
            onPress={saveAsync}
            backgroundColor={Colors.orange}
            textStyle={{color: Colors.white}}
          />
          <Button
            text="Clear"
            testID="data-async-clear"
            onPress={clearAsync}
            backgroundColor={Colors.light}
          />
        </View>
      </View>

      <Text style={[styles.sectionTitle, {color: fg}]}>2b. SQLite (explicit)</Text>
      <Text style={[styles.hint, {color: muted}]}>
        Second on-disk table, same clear rules as other app files.
      </Text>
      <View style={[styles.card, {borderColor: Colors.orange}]}>
        <Input
          label="Type a value, then tap Save"
          value={sqliteInput}
          onChangeText={setSqliteInput}
          placeholder="Persisted in SQLite"
          labelStyle={{color: fg}}
          inputStyle={{color: fg}}
        />
        <View
          style={[
            styles.valueReadout,
            {
              borderColor: Colors.orange,
              backgroundColor: isDarkMode
                ? 'rgba(255, 149, 0, 0.12)'
                : 'rgba(255, 149, 0, 0.1)',
            },
          ]}>
          <Text style={[styles.valueReadoutCaption, {color: muted}]}>
            ▼ Last saved SQLite row (read from disk, survives app restart)
          </Text>
          <Text
            {...readoutTestProps('data-sqlite-readout', sqliteReadoutText)}
            style={[styles.valueReadoutText, {color: fg}]}>
            {sqliteReadoutText}
          </Text>
        </View>
        <View style={styles.row}>
          <Button
            text="Save"
            testID="data-sqlite-save"
            onPress={saveSqlite}
            backgroundColor={Colors.orange}
            textStyle={{color: Colors.white}}
          />
          <Button
            text="Clear"
            testID="data-sqlite-clear"
            onPress={clearSqlite}
            backgroundColor={Colors.light}
          />
        </View>
      </View>

      <Text style={[styles.sectionTitle, {color: fg}]}>
        3. Secure storage (Keychain / Keystore)
      </Text>
      <Text style={[styles.hint, {color: muted}]}>
        Stronger than plain files: survives process death and “Clear data” style
        wipes differ by platform. It does{' '}
        <Text style={{fontWeight: '700'}}>not</Text> survive uninstalling the
        app, Android removes that app’s Keystore-backed data; iOS removes this
        app’s Keychain items when the app is deleted. For tests, Appium often
        cannot clear it without device reset or this in-app Clear.
      </Text>
      <View style={[styles.card, {borderColor: Colors.orange}]}>
        <Input
          label="Type a value, then tap Save"
          value={secureInput}
          onChangeText={setSecureInput}
          placeholder="Stored in Keychain / Keystore"
          labelStyle={{color: fg}}
          inputStyle={{color: fg}}
        />
        <View
          style={[
            styles.valueReadout,
            {
              borderColor: Colors.orange,
              backgroundColor: isDarkMode
                ? 'rgba(255, 149, 0, 0.12)'
                : 'rgba(255, 149, 0, 0.1)',
            },
          ]}>
          <Text style={[styles.valueReadoutCaption, {color: muted}]}>
            ▼ Last saved secure value (survives restart, gone if app is
            uninstalled)
          </Text>
          <Text
            {...readoutTestProps('data-secure-readout', secureReadoutText)}
            style={[styles.valueReadoutText, {color: fg}]}>
            {secureReadoutText}
          </Text>
        </View>
        <View style={styles.row}>
          <Button
            text="Save"
            testID="data-secure-save"
            onPress={saveSecure}
            backgroundColor={Colors.orange}
            textStyle={{color: Colors.white}}
          />
          <Button
            text="Clear (test hook)"
            testID="data-secure-clear"
            onPress={clearSecure}
            backgroundColor={Colors.light}
          />
        </View>
      </View>

      <Text style={[styles.sectionTitle, {color: fg}]}>
        4. Same data after uninstall + reinstall?
      </Text>
      <View style={[styles.infoCard, {borderColor: muted}]}>
        <Text style={[styles.infoText, {color: fg}]}>
          Reinstall behavior can differ between iOS and Android. For example,
          iOS (Simulator) Keychain entries may survive uninstall/reinstall, while
          Android Keystore-backed SecureStore is usually reset when the app is
          removed.
        </Text>
        <Text style={[styles.infoText, {color: fg, marginTop: 10}]}>
          This is mostly defined by how the customer app is built and
          distributed (signing profile, backup/restore policy, device vs
          simulator behavior), so treat it as platform/build dependent rather
          than guaranteed by one local storage API.
        </Text>
      </View>

      <View style={{height: 40}} />
    </ScrollView>
  );
}

/**
 * Stable test id + label that includes the current readout text for Appium:
 * iOS: testID; Android: accessibilityLabel → content-desc (parse after "id: ").
 */
function readoutTestProps(testId: string, displayText: string) {
  return {
    testID: testId,
    accessibilityLabel: `${testId}: ${displayText}`,
  };
}

/** Row objects may use different key casing per platform/driver. */
function pickTextColumn(row: Record<string, unknown> | null): string {
  if (row == null) {
    return '';
  }
  const v =
    row.value ??
    row.VALUE ??
    row.Value ??
    Object.values(row).find(x => typeof x === 'string');
  return typeof v === 'string' ? v : '';
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: STATUS_BAR_HEIGHT,
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  lead: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 6,
  },
  hint: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 10,
  },
  card: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  valueReadout: {
    marginTop: 12,
    marginBottom: 12,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 2,
  },
  valueReadoutCaption: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  valueReadoutText: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '700',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
  },
  infoCard: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 14,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    lineHeight: 20,
  },
});

export default DataManagementScreen;
