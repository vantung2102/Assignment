package com.example.hrm;

import java.io.IOException;

import okhttp3.Credentials;
import okhttp3.Interceptor;
import okhttp3.Request;
import okhttp3.Response;


public class BasicAuthInterceptor implements Interceptor {
    public BasicAuthInterceptor(String username,String password) {
        this.credentials = credentials;
        this.username = username;
        this.password = password;
        credentials=Credentials.basic(username, password);
    }

    String credentials;
    String username,password;
    @Override
    public Response intercept(Chain chain) throws IOException {
        Request request = chain.request();
        request = request.newBuilder().header("Authorization", credentials).build();
        return chain.proceed(request);
    }
}
