package com.example.hrm.Response;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import java.util.List;

import javax.annotation.Generated;

@Generated("jsonschema2pojo")
public class DataResponseList<T>{
    @SerializedName("data")
    @Expose
    private List<T> data;

    public List<T>getData() {
        return data;
    }

    public void setData(List<T> data) {
        this.data = data;
    }

}