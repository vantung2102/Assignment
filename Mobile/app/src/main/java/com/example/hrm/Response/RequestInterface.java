package com.example.hrm.Response;

import com.google.gson.JsonObject;

import okhttp3.RequestBody;
import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.Header;
import retrofit2.http.POST;
import retrofit2.http.PUT;

public interface RequestInterface {

    @GET("api_endpoint")
    Call<JsonObject> getJson();
    @POST("v1/staff_management/departments")
    Call<JsonObject> addDepartment(@Body RequestBody body, @Header("Authorization") String token);
    @POST("v1/staff_management/job_titles")
    Call<JsonObject> addJobTitle(@Body RequestBody body, @Header("Authorization") String token);
    @POST("v1/staff_management/positions")
    Call<JsonObject> addPosition(@Body RequestBody body, @Header("Authorization") String token);
    @POST("v1/staff_management/staffs")
    Call<JsonObject> addStaff(@Body RequestBody body, @Header("Authorization") String token);
    @POST("v1/leave_management/leave_applications")
    Call<ResponseBody> addLeaveApplication(@Body RequestBody body,@Header("Authorization") String token);

    @POST("v1/property_management/group_properties")
    Call<JsonObject> addPropertyGroup(@Body RequestBody body, @Header("Authorization") String token);
    @POST("v1/property_management/properties")
    Call<JsonObject> addProperty(@Body RequestBody body, @Header("Authorization") String token);

    @POST("v1/request_management/request_properties")
    Call<JsonObject> addRequestProperty(@Header("Authorization") String token,@Body RequestBody body);
}