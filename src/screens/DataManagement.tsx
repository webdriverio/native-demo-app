import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import {openDatabaseAsync, type SQLiteDatabase} from 'expo-sqlite';
import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
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

const ASYNC_STORAGE_KEY = 'wdio_demo_async_value';
const SECURE_STORE_KEY = 'wdio_demo_secure_value';
const SQLITE_DB = 'wdio_data_management.db';

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
  const dbRef = useRef<SQLiteDatabase | null>(null);

  const [secureInput, setSecureInput] = useState('');
  const [secureValue, setSecureValue] = useState('');

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const a = await AsyncStorage.getItem(ASYNC_STORAGE_KEY);
        if (!alive) {
          return;
        }
        setAsyncValue(a ?? '');
        const s = await SecureStore.getItemAsync(SECURE_STORE_KEY);
        if (!alive) {
          return;
        }
        setSecureValue(s ?? '');

        const db = await openDatabaseAsync(SQLITE_DB);
        if (!alive) {
          await db.closeAsync();
          return;
        }
        dbRef.current = db;
        await db.execAsync(`
          CREATE TABLE IF NOT EXISTS demo_single (
            id INTEGER PRIMARY KEY CHECK (id = 1),
            value TEXT NOT NULL
          );
        `);
        const row = await db.getFirstAsync<{value: string}>(
          'SELECT value FROM demo_single WHERE id = 1',
        );
        if (!alive) {
          return;
        }
        setSqliteValue(row?.value ?? '');
      } catch (e) {
        if (alive) {
          Alert.alert('Load failed', String(e));
        }
      }
    })();
    return () => {
      alive = false;
      const d = dbRef.current;
      dbRef.current = null;
      void d?.closeAsync();
    };
  }, []);

  const saveMemory = () => {
    setMemoryValue(memoryInput);
  };
  const clearMemory = () => {
    setMemoryInput('');
    setMemoryValue('');
  };

  const saveAsync = async () => {
    try {
      await AsyncStorage.setItem(ASYNC_STORAGE_KEY, asyncInput);
      setAsyncValue(asyncInput);
    } catch (e) {
      Alert.alert('AsyncStorage', String(e));
    }
  };
  const clearAsync = async () => {
    try {
      await AsyncStorage.removeItem(ASYNC_STORAGE_KEY);
      setAsyncInput('');
      setAsyncValue('');
    } catch (e) {
      Alert.alert('AsyncStorage', String(e));
    }
  };

  const saveSqlite = async () => {
    const db = dbRef.current;
    if (!db) {
      Alert.alert('SQLite', 'Database not ready');
      return;
    }
    try {
      await db.runAsync(
        'INSERT OR REPLACE INTO demo_single (id, value) VALUES (1, ?)',
        sqliteInput,
      );
      setSqliteValue(sqliteInput);
    } catch (e) {
      Alert.alert('SQLite', String(e));
    }
  };
  const clearSqlite = async () => {
    const db = dbRef.current;
    if (!db) {
      return;
    }
    try {
      await db.runAsync('DELETE FROM demo_single WHERE id = 1');
      setSqliteInput('');
      setSqliteValue('');
    } catch (e) {
      Alert.alert('SQLite', String(e));
    }
  };

  const saveSecure = async () => {
    try {
      await SecureStore.setItemAsync(SECURE_STORE_KEY, secureInput, {
        keychainAccessible: SecureStore.WHEN_UNLOCKED,
      });
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
          label="Value"
          value={memoryInput}
          onChangeText={setMemoryInput}
          placeholder="Type and save to RAM"
          labelStyle={{color: fg}}
          inputStyle={{color: fg}}
        />
        <Text style={[styles.current, {color: fg}]}>
          Current: {memoryValue === '' ? '—' : memoryValue}
        </Text>
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
        2. Persisted (AsyncStorage)
      </Text>
      <Text style={[styles.hint, {color: muted}]}>
        Typical “local storage” for React Native. Clears with mobile: clearApp
        on Android, or terminate + relaunch / reinstall on iOS (same class as
        SQLite files on disk).
      </Text>
      <View style={[styles.card, {borderColor: Colors.orange}]}>
        <Input
          label="Value"
          value={asyncInput}
          onChangeText={setAsyncInput}
          placeholder="Persisted key/value"
          labelStyle={{color: fg}}
          inputStyle={{color: fg}}
        />
        <Text style={[styles.current, {color: fg}]}>
          Stored: {asyncValue === '' ? '—' : asyncValue}
        </Text>
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

      <Text style={[styles.sectionTitle, {color: fg}]}>2b. SQLite</Text>
      <Text style={[styles.hint, {color: muted}]}>
        Same persistence lifecycle as other on-disk app data (single-row demo
        table).
      </Text>
      <View style={[styles.card, {borderColor: Colors.orange}]}>
        <Input
          label="Value"
          value={sqliteInput}
          onChangeText={setSqliteInput}
          placeholder="Persisted in SQLite"
          labelStyle={{color: fg}}
          inputStyle={{color: fg}}
        />
        <Text style={[styles.current, {color: fg}]}>
          Stored: {sqliteValue === '' ? '—' : sqliteValue}
        </Text>
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
        Survives normal app data clears. Appium cannot wipe this; use a device
        reset or this in-app “Clear” (SecureStore.deleteItemAsync) as a test
        hook.
      </Text>
      <View style={[styles.card, {borderColor: Colors.orange}]}>
        <Input
          label="Value"
          value={secureInput}
          onChangeText={setSecureInput}
          placeholder="Stored in Keychain / Keystore"
          labelStyle={{color: fg}}
          inputStyle={{color: fg}}
        />
        <Text style={[styles.current, {color: fg}]}>
          Stored: {secureValue === '' ? '—' : secureValue}
        </Text>
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

      <View style={{height: 40}} />
    </ScrollView>
  );
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
  current: {
    marginBottom: 8,
    fontSize: 15,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
  },
});

export default DataManagementScreen;
