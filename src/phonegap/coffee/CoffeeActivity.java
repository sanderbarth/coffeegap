package phonegap.coffee;

import org.apache.cordova.DroidGap;
import android.content.Intent;
import com.arellomobile.android.push.PushManager;

import android.os.Bundle;

public class CoffeeActivity extends DroidGap {

	@Override
	public void onCreate(Bundle savedInstanceState) {

		PushManager mPushManager = new PushManager(this, "phonegap.coffee", "myId");
		mPushManager.onStartup(this);

		super.setIntegerProperty("loadUrlTimeoutValue", 60000);
		// load url first, then we can access appView and appView in DroidGap
		super.loadUrl("file:///android_asset/www/index.html");

		checkMessage(getIntent());
	}

	@Override
	protected void onNewIntent(Intent intent)
	{
		super.onNewIntent(intent);
		setIntent(intent);

		checkMessage(intent);
	}

	private void checkMessage(Intent intent)
	{
		if (null != intent)
		{
			if (intent.hasExtra(PushManager.PUSH_RECEIVE_EVENT))
			{
				sendJavascript(getJSFunction("onPushReceive",
						intent.getExtras().getString(PushManager.PUSH_RECEIVE_EVENT)));
			}
			else if (intent.hasExtra(PushManager.REGISTER_EVENT))
			{
				sendJavascript(getJSFunction("onRegister",
						intent.getExtras().getString(PushManager.REGISTER_EVENT)));
			}
			else if (intent.hasExtra(PushManager.UNREGISTER_EVENT))
			{
				sendJavascript(getJSFunction("onUnregister",
						intent.getExtras().getString(PushManager.UNREGISTER_EVENT)));
			}
			else if (intent.hasExtra(PushManager.REGISTER_ERROR_EVENT))
			{
				sendJavascript(getJSFunction("onRegisterError",
						intent.getExtras().getString(PushManager.REGISTER_ERROR_EVENT)));
			}
		}
	}

	private String getJSFunction(String functionName, String string)
	{
		return "javascript:" + functionName + "(\"" + string.replaceAll("\"", "'") + "\");";
	}
}
