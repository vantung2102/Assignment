package com.example.hrm;

import android.content.Context;
import android.content.SharedPreferences;
import android.content.res.Resources;
import android.util.TypedValue;

import com.example.hrm.Response.DataResponse;
import com.example.hrm.Response.DatumTemplate;
import com.example.hrm.Response.StaffAttributes;
import com.example.hrm.Services.APIService;

import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class Common {
    public static final String STATUS_USED = "used";
    public static final String STATUS_AVAILABLE = "available";
    public static final String STATUS_PROVIDED = "provided";
    public static final String STATUS_RECALLED = "recall";
    public static final String MANAGER ="Manager" ;
    public static final String STAFF ="Staff" ;

    public  static  String EMAIL_KEY="EMAIL";
    public  static  String PASSWORD_KEY="PASSWORD";
    public  static  String CURRENT_FRAGMENT_TAG="";
    public static  String STATUS_PENDING="pending";
    public static  String STATUS_APPROVED="approved";
    public static  String STATUS_CANCLED="cancelled";

    public static void save(Context mContext,String key,String text) {

        SharedPreferences sharedPref = mContext.getSharedPreferences("application", Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = sharedPref.edit();
        editor.putString(key, text);
        editor.apply();
    }
    public static String getData(Context mContext,String key){
        SharedPreferences sharedPref = mContext.getSharedPreferences("application", Context.MODE_PRIVATE);
        return sharedPref.getString(key,"");
    }
    public static int convertDpToPx(int dp){
        return (int) (dp * Resources.getSystem().getDisplayMetrics().density);
    }
    public  static  String token;
    public  static String userId;
    public  static StaffAttributes staff=null;

    public static StaffAttributes getStaff() {
        return staff;
    }

    public static void setStaff(StaffAttributes staff) {
        Common.staff = staff;
    }

    public static String getToken() {
        return token;
    }

    public static void setToken(String token) {
        Common.token = token;
    }

    public static String getUserId() {
        return userId;
    }

    public static void setUserId(String userId) {
        Common.userId = userId;
    }

    public static String[] staffNames;

    public static String[] getStaffNames() {
        return staffNames;
    }

    public static void setStaffNames(String[] staffNames) {
        Common.staffNames = staffNames;
    }

    public static List<StaffAttributes> staffs;

    public static List<StaffAttributes> getStaffs() {
        return staffs;
    }

    public static void setStaffs(List<StaffAttributes> staffs) {
        Common.staffs = staffs;
    }
    public static int getValueInPixel(Context mContext,int value){
        int valueConverted = (int) TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, value, mContext.getResources().getDisplayMetrics());
        return valueConverted;
    }

    public static void getCurrentUser() {
        Call<DataResponse<DatumTemplate<StaffAttributes>>> call = APIService.getService().getCurrentUser(Common.getToken());
        call.enqueue(new Callback<DataResponse<DatumTemplate<StaffAttributes>>>() {
            @Override
            public void onResponse(Call<DataResponse<DatumTemplate<StaffAttributes>>> call, Response<DataResponse<DatumTemplate<StaffAttributes>>> response) {
                if(response.isSuccessful()){
                    Common.setStaff(response.body().getData().getAttributes());
                }
            }

            @Override
            public void onFailure(Call<DataResponse<DatumTemplate<StaffAttributes>>> call, Throwable t) {

            }
        });
    }

    public static void getCurrentUser(DetailLeaveApplicationFragment.IDoStuff iDoStuff) {
        Call<DataResponse<DatumTemplate<StaffAttributes>>> call = APIService.getService().getCurrentUser(Common.getToken());
        call.enqueue(new Callback<DataResponse<DatumTemplate<StaffAttributes>>>() {
            @Override
            public void onResponse(Call<DataResponse<DatumTemplate<StaffAttributes>>> call, Response<DataResponse<DatumTemplate<StaffAttributes>>> response) {
                if(response.isSuccessful()){
                    Common.setStaff(response.body().getData().getAttributes());
                    iDoStuff.doSome();
                }
            }

            @Override
            public void onFailure(Call<DataResponse<DatumTemplate<StaffAttributes>>> call, Throwable t) {

            }
        });
    }
}
