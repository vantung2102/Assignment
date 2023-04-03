package com.example.hrm.Services;

import com.example.hrm.Response.Attributes;
import com.example.hrm.Response.Data;
import com.example.hrm.Response.DataListHasMetaResponse;
import com.example.hrm.Response.DataResponse;
import com.example.hrm.Response.DataResponseList;
import com.example.hrm.Response.DataStaff;
import com.example.hrm.Response.DatumStaff;
import com.example.hrm.Response.DatumStaffLeave;
import com.example.hrm.Response.DatumTemplate;
import com.example.hrm.Response.LeaveApplicationAttributes;
import com.example.hrm.Response.LoginResponse;
import com.example.hrm.Response.OnboardingByStaffAttributes;
import com.example.hrm.Response.OnboardingSampleStepAtrributes;
import com.example.hrm.Response.PerformanceAttributes;
import com.example.hrm.Response.PropertyAttributes;
import com.example.hrm.Response.PropertyHistoryAttributes;
import com.example.hrm.Response.RequestPropertyAttributes;
import com.example.hrm.Response.StaffAttributes;
import com.example.hrm.Response.StaffLeaveAttributes;
import com.google.gson.JsonObject;

import okhttp3.RequestBody;
import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.DELETE;
import retrofit2.http.GET;
import retrofit2.http.Header;
import retrofit2.http.Headers;
import retrofit2.http.POST;
import retrofit2.http.PUT;
import retrofit2.http.Path;
import retrofit2.http.Query;

public interface DataService {
    @GET("v1/staff_management/departments/get_all_department")
    Call<Data> get_all_department(@Header("Authorization") String token);
    @GET("v1/staff_management/job_titles/get_all_job_title")
    Call<Data> get_all_job_title(@Header("Authorization") String token);

    @GET("v1/staff_management/positions/get_all_position")
    Call<Data> get_all_position(@Header("Authorization") String token);
    @GET("v1/staff_management/staffs/get_all_staff")
    Call<DataStaff> get_all_staff(@Header("Authorization") String token);

    @GET("v1/staff_management/staffs/{id}")
    Call<DataStaff> fetchProfile(@Path("id") Integer id,@Header("Authorization") String token);

    @GET("v1/staff_management/staffs/{id}")
    Call<DataResponse<DatumStaff>> fetchProfileRaw(@Path("id") Integer id,@Header("Authorization") String token);

    @Headers({"Content-Type: application/json"})

    @POST("v1/leave_management/leaves/leave_by_user")
    Call<DataResponse<DatumStaffLeave>> getUser(@Body RequestBody body,@Header("Authorization") String token);
    @Headers({"Content-Type: application/json"})

    @POST("v1/onboarding_management/onboarding_steps/onboarding_steps_by_staff_onboarding")
    Call<DataResponseList<DatumTemplate<OnboardingByStaffAttributes>>> getOnBoardingByStaff(@Body RequestBody body,@Header("Authorization") String token);

    @GET("v1/staff_management/staffs/get_all_staff")
    Call<DataResponseList<DatumTemplate<StaffAttributes>>> getAllStaff(@Header("Authorization") String token);
    @POST("auth/login")
    Call<LoginResponse> login(@Body RequestBody body);

    @GET("v1/staff_management/departments/get_all_department")
    Call<DataResponseList<DatumTemplate<Attributes>>> getAllDepartments(@Header("Authorization") String token);
    @GET("v1/staff_management/job_titles/get_all_job_title")
    Call<DataResponseList<DatumTemplate<Attributes>>> getAllJobTitles(@Header("Authorization") String token);
    @GET("v1/staff_management/positions/get_all_position")
    Call<DataResponseList<DatumTemplate<Attributes>>> getAllPositions(@Header("Authorization") String token);
    @GET("v1/staff_management/staffs/get_inactive_staff")
    Call<DataResponseList<DatumTemplate<StaffAttributes>>> getAllInactiveStaff(@Header("Authorization") String token);
    @GET("v1/leave_management/leaves?")
    Call<DataListHasMetaResponse<DatumTemplate<StaffLeaveAttributes>>> getLeaveByPageNum(@Header("Authorization") String token, @Query("page[number]") int num);
    @GET("v1/staff_management/departments?")
    Call<DataListHasMetaResponse<DatumTemplate<Attributes>>> getDepartmentByPageNum(@Header("Authorization") String token, @Query("page[number]") int num);
    @GET("v1/property_management/group_properties?")
    Call<DataListHasMetaResponse<DatumTemplate<Attributes>>> getGroupPropertiesByPageNum(@Header("Authorization") String token, @Query("page[number]") int num);
    @GET("v1/property_management/group_properties")
    Call<DataListHasMetaResponse<DatumTemplate<Attributes>>> getAllGroupProperties(@Header("Authorization") String token);
    @GET("v1/property_management/properties?")
    Call<DataListHasMetaResponse<DatumTemplate<PropertyAttributes>>> getPropertiesByPageNum(@Header("Authorization") String token, @Query("page[number]") int num);

    @GET("v1/leave_management/leave_applications")
    Call<DataResponseList<DatumTemplate<LeaveApplicationAttributes>>> getAllLeaveApplication(@Header("Authorization") String token);
    @GET("v1/onboarding_management/onboarding_sample_steps")
    Call<DataResponseList<DatumTemplate<OnboardingSampleStepAtrributes>>> getAllOnboardingSampleSteps(@Header("Authorization") String token);

    @POST("v1/staff_management/departments")
    Call<JsonObject> addDepartment(@Body RequestBody body, @Header("Authorization") String token);
    @DELETE("v1/staff_management/departments/{id}")
    Call<ResponseBody> deleteDepartment(@Header("Authorization") String token,@Path("id") Integer id);
    @DELETE("v1/property_management/properties/{id}")
    Call<ResponseBody> deleteProperty(@Header("Authorization") String token,@Path("id") Integer id);
    @DELETE("v1/property_management/property_providing_histories/{id}")
    Call<ResponseBody> deleteProvidingHistory(@Header("Authorization") String token,@Path("id") Integer id);

    @DELETE("v1/request_management/request_properties/{id}")
    Call<ResponseBody> deleteRequestProperty(@Header("Authorization") String token,@Path("id") Integer id);
    @DELETE("v1/staff_management/job_titles/{id}")
    Call<ResponseBody> deleteJobtitle(@Header("Authorization") String token,@Path("id") Integer id);
    @DELETE("v1/staff_management/positions/{id}")
    Call<ResponseBody> deletePosition(@Header("Authorization") String token,@Path("id") Integer id);
    @DELETE("v1/property_management/group_properties/{id}")
    Call<ResponseBody> deletePropertyGroup(@Header("Authorization") String token,@Path("id") Integer id);
    @PUT("v1/staff_management/departments/{id}")
    Call<ResponseBody> updateDepartment(@Header("Authorization") String token,@Path("id") Integer id,@Body RequestBody body);
    @PUT("v1/property_management/properties/{id}")
    Call<JsonObject> updateProperty(@Header("Authorization") String token,@Path("id") Integer id,@Body RequestBody body);

    @PUT("v1/staff_management/job_titles/{id}")
    Call<ResponseBody> updateJobtitle(@Header("Authorization") String token,@Path("id") Integer id,@Body RequestBody body);
    @PUT("v1/staff_management/staffs/{id}")
    Call<JsonObject> updateStaff(@Header("Authorization") String token,@Path("id") Integer id,@Body RequestBody body);
    @PUT("v1/staff_management/positions/{id}")
    Call<ResponseBody> updatePosition(@Header("Authorization") String token,@Path("id") Integer id,@Body RequestBody body);
    @PUT("v1/onboarding_management/onboarding_sample_steps/{id}")
    Call<JsonObject> updateOnboardingSampleSteps(@Header("Authorization") String token,@Path("id") Integer id,@Body RequestBody body);
    @POST("v1/leave_management/leave_applications/{id}/respond_to_leave_application")
    Call<DataResponse<DatumTemplate<LeaveApplicationAttributes>>> respond_to_leave_application(@Path("id") int id,@Header("Authorization") String token,@Body RequestBody body);

    @POST(" v1/request_management/request_properties/{id}}/response_request")
    Call<DataResponse<DatumTemplate<RequestPropertyAttributes>>> respond_to_request_property(@Path("id") int id,@Header("Authorization") String token,@Body RequestBody body);
    @GET("auth/get_current_user")
    Call<DataResponse<DatumTemplate<StaffAttributes>>> getCurrentUser(@Header("Authorization") String token);

    @DELETE("v1/leave_management/leave_applications/{id}")
    Call<ResponseBody> deleteLeaveApplication(@Header("Authorization") String token,@Path("id") Integer id);
    @POST("v1/leave_management/leave_applications/leave_application_by_status")
    Call<DataResponseList<DatumTemplate<LeaveApplicationAttributes>>> getLeaveApByStatus(@Header("Authorization") String token,@Body RequestBody body);

    @POST("v1/onboarding_management/onboarding_sample_steps")
    Call<DataResponse<DatumTemplate<OnboardingSampleStepAtrributes>>> addOnboardingSampleSteps(@Header("Authorization") String token,@Body RequestBody body);

    @DELETE("v1/onboarding_management/onboarding_sample_steps/{id}")
    Call<ResponseBody> deleteOnboardingTaskSample(@Header("Authorization") String token,@Path("id") Integer id);
    @GET("v1/performance_management/performance_appraisal_forms")
    Call<DataResponseList<DatumTemplate<PerformanceAttributes>>> getAllPerformanceAppraisalForms(@Header("Authorization") String token);
    @GET("v1/performance_management/performance_appraisal_forms/pa_forms_by_current_user")
    Call<DataResponseList<DatumTemplate<PerformanceAttributes>>> getPaFormsByCurrentUser(@Header("Authorization") String token);

    @PUT("v1/property_management/group_properties/{id}")
    Call<ResponseBody> updatePrppertyGroup(@Header("Authorization") String token,@Path("id") Integer id,@Body RequestBody body);
    @PUT("v1/property_management/properties/{id}/response_property_request")
    Call<JsonObject> responsePropertyRequest(@Header("Authorization") String token,@Path("id") Integer id,@Body RequestBody body);
    @PUT("v1/property_management/properties/{id}/response_property_request")
    Call<JsonObject> responsePropertyRequest(@Header("Authorization") String token,@Path("id") Integer id);
    @POST("v1/property_management/property_providing_histories/histories_by_property")
    Call<DataResponseList<DatumTemplate<PropertyHistoryAttributes>>> getPropertyHistory(@Header("Authorization") String token,@Body RequestBody body);
    @GET("v1/property_management/property_providing_histories")
    Call<DataListHasMetaResponse<DatumTemplate<PropertyHistoryAttributes>>> getAllHistoryProviding(@Header("Authorization") String token);
    @GET("v1/request_management/request_properties")
    Call<DataListHasMetaResponse<DatumTemplate<RequestPropertyAttributes>>> getAllPropertyRequest(@Header("Authorization") String token);
}

