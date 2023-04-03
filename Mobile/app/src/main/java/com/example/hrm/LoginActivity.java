package com.example.hrm;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.os.FileUtils;
import android.text.TextUtils;
import android.util.ArrayMap;
import android.util.Log;
import android.view.View;
import android.widget.EditText;
import android.widget.Toast;

import com.example.hrm.Response.DataResponse;
import com.example.hrm.Response.DataResponseList;
import com.example.hrm.Response.DatumTemplate;
import com.example.hrm.Response.LoginResponse;
import com.example.hrm.Response.OnboardingByStaffAttributes;
import com.example.hrm.Response.StaffAttributes;
import com.example.hrm.Services.APIService;
import com.example.hrm.Services.DataService;
import com.example.hrm.databinding.ActivityLoginBinding;

import org.json.JSONObject;

import java.util.Map;
import java.util.regex.Pattern;

import okhttp3.RequestBody;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class LoginActivity extends AppCompatActivity {
    ActivityLoginBinding activityLoginBinding;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        activityLoginBinding=ActivityLoginBinding.inflate(getLayoutInflater());
        setContentView(activityLoginBinding.getRoot());
        if(!Common.getData(getApplicationContext(),"EMAIL").equals("")){
            activityLoginBinding.txtEmail.setText(Common.getData(getApplicationContext(),"EMAIL"));
            activityLoginBinding.txtPassword.setText(Common.getData(getApplicationContext(),"PASSWORD"));
        }
        activityLoginBinding.btnLogin.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                String email=activityLoginBinding.txtEmail.getText().toString();
                String password=activityLoginBinding.txtPassword.getText().toString();
                if(TextUtils.isEmpty(email)){
                    activityLoginBinding.txtMessEmail.setText("Email Address is required");
                    activityLoginBinding.txtMessEmail.setVisibility(View.VISIBLE);
                    activityLoginBinding.txtEmail.requestFocus();
                } else if(TextUtils.isEmpty(password)){
                    activityLoginBinding.txtMessPass.setText("Password is required");
                    activityLoginBinding.txtMessPass.setVisibility(View.VISIBLE);
                    activityLoginBinding.txtPassword.requestFocus();
                }
                else {

                    activityLoginBinding.txtMessPass.setVisibility(View.GONE);
                    //validate
                    String regex = "^[\\w!#$%&'*+/=?`{|}~^-]+(?:\\.[\\w!#$%&'*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}";
                    //Compile regular expression to get the pattern
                    Pattern pattern = Pattern.compile(regex);
                    if(pattern.matcher(email).matches()){
                        activityLoginBinding.txtMessEmail.setVisibility(View.GONE);
                        //Toast.makeText(LoginActivity.this, "Email:"+email+" pass:"+password, Toast.LENGTH_SHORT).show();
                        Map<String, Object> jsonParams = new ArrayMap<>();
                        jsonParams.put("email", email);
                        jsonParams.put("password", password);
                        RequestBody body = RequestBody.create(okhttp3.MediaType.parse("application/json"), (new JSONObject(jsonParams)).toString());
                        Call<LoginResponse> call = APIService.getService().login(body);
                        call.enqueue(new Callback<LoginResponse>() {
                            @Override
                            public void onResponse(Call<LoginResponse> call, Response<LoginResponse> response) {
                                Log.d("LoginResponse","onResponse");
                                if(response.isSuccessful()){
                                    String token=response.body().getToken();
                                    String userId=response.body().getStaff().toString();
                                    Common.setToken(token);
                                    Common.getCurrentUser();
                                    Common.setUserId(userId);
                                    Common.save(getApplicationContext(),"EMAIL",email);
                                    Common.save(getApplicationContext(),"PASSWORD",password);
                                    Log.d("LoginResponse",token);
                                    Intent intent=new Intent(LoginActivity.this,HomeActivity.class);
                                    startActivity(intent);
                                }
                                else {
                                    if(response.code()==401){
                                        Toast.makeText(LoginActivity.this, "Login failed", Toast.LENGTH_SHORT).show();
                                    }
                                }


                            }

                            @Override
                            public void onFailure(Call<LoginResponse> call, Throwable t) {
                                Log.d("LoginResponse","onFailure: "+t.getMessage());
                                Toast.makeText(LoginActivity.this, "Login failed", Toast.LENGTH_SHORT).show();

                            }
                        });
                    } else {
                        activityLoginBinding.txtMessEmail.setText("Incorrect email format");
                        activityLoginBinding.txtMessEmail.setVisibility(View.VISIBLE);
                    }
                    //validate pass after

                }
            }
        });
    }



}