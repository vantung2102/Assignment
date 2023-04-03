package com.example.hrm.Response;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import java.util.List;

import javax.annotation.Generated;

@Generated("jsonschema2pojo")
public class DataStaff {

    @SerializedName("data")
    @Expose
    private List<DatumStaff> data;

    public List<DatumStaff> getData() {
        return data;
    }

    public void setData(List<DatumStaff> data) {
        this.data = data;
    }

}
