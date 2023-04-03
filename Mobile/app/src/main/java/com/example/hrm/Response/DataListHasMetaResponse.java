package com.example.hrm.Response;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import java.util.List;

public class DataListHasMetaResponse<T>{
    @SerializedName("data")
    @Expose
    private List<T> data;

    public List<T> getData() {
        return data;
    }

    @SerializedName("meta")
    @Expose
    private Meta meta;

    public void setData(List<T> data) {
        this.data = data;
    }

    public Meta getMeta() {
        return meta;
    }

    public void setMeta(Meta meta) {
        this.meta = meta;
    }
}
