package com.wdiodemoapp;

// Needed for the splashscreen
import org.devio.rn.splashscreen.SplashScreen;
import android.os.Bundle;
import com.facebook.react.ReactActivity;

// For dark theme
import android.content.res.Configuration;

public class MainActivity extends ReactActivity {

  /**
   * Needed for the splash screen
   */
  @Override
  protected void onCreate(Bundle savedInstanceState) {
      SplashScreen.show(this, R.style.SplashStatusBarTheme);
      super.onCreate(savedInstanceState);
  }

  /**
   * Needed for dark theme
   */
  @Override
  public void onConfigurationChanged(Configuration newConfig) {
    super.onConfigurationChanged(newConfig);
    getReactInstanceManager().onConfigurationChanged(this, newConfig);
  }

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "wdioDemoApp";
  }
}
