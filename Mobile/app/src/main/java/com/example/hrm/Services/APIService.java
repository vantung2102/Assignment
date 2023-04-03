package com.example.hrm.Services;

import com.example.hrm.Response.RequestInterface;

public class APIService {
    private static String baseUrl="http://10.0.2.2:3000/api/";
    public static DataService getService(){
        return APIRetrofitClient.getClient(baseUrl).create(DataService.class);
    }
    public static DataService getService2(String userName,String password){
        return APIRetrofitClient.getClient2(baseUrl,userName,password).create(DataService.class);
    }
    public static RequestInterface getServiceJson(){
        return APIRetrofitClient.getClient(baseUrl).create(RequestInterface.class);
    }
}
