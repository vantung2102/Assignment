package com.example.hrm.Response;


import javax.annotation.Generated;
        import com.google.gson.annotations.Expose;
        import com.google.gson.annotations.SerializedName;

@Generated("jsonschema2pojo")
public class LoginResponse {

    @SerializedName("token")
    @Expose
    private String token;
    @SerializedName("staff")
    @Expose
    private Integer staff;

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Integer getStaff() {
        return staff;
    }

    public void setStaff(Integer staff) {
        this.staff = staff;
    }

    @Override
    public String toString() {
        return "LoginResponse{" +
                "token='" + token + '\'' +
                ", staff=" + staff +
                '}';
    }
}
