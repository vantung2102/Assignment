package com.example.hrm.viewmodel;


import android.text.TextUtils;
import android.widget.ArrayAdapter;

import androidx.databinding.BaseObservable;
import androidx.databinding.Bindable;

import com.example.hrm.BR;
import com.example.hrm.Response.Attributes;
import com.example.hrm.Response.PropertyAttributes;
import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import javax.annotation.Generated;

@Generated("jsonschema2pojo")
public class PropertyViewModel extends BaseObservable {

    @SerializedName("id")
    @Expose
    private Integer id;
    @SerializedName("code_seri")
    @Expose
    private String codeSeri="";
    @SerializedName("name")
    @Expose
    private String name="";
    @SerializedName("brand")
    @Expose
    private String brand="";
    @SerializedName("group_property")
    @Expose
    private String groupProperty="";
    @SerializedName("price")
    @Expose
    private String price="";
    @SerializedName("date_buy")
    @Expose
    private String dateBuy="";
    @SerializedName("number_of_repairs")
    @Expose
    private String numberOfRepairs="";
    @SerializedName("status")
    @Expose
    private String status="";
    @SerializedName("created_at")
    @Expose
    private String createdAt="";
    @SerializedName("updated_at")
    @Expose
    private String updatedAt="";
    private ArrayAdapter<String> adapter;
    private  boolean submited=false;
    @Bindable
    public boolean isSubmited() {
        return submited;
    }

    public void setSubmited(boolean submited) {
        this.submited = submited;
        notifyPropertyChanged(BR.submited);
    }

    @Bindable
    public ArrayAdapter<String> getAdapter() {
        return adapter;
    }

    public void setAdapter(ArrayAdapter<String> adapter) {
        this.adapter = adapter;
        notifyPropertyChanged(BR.adapter);
    }

    public PropertyViewModel(PropertyAttributes property) {
        this.codeSeri=property.getCodeSeri();
        this.brand=property.getBrand();
        this.groupProperty=property.
                getGroupProperty().getName();
        this.dateBuy=property.getDateBuy();
        this.numberOfRepairs= String.valueOf(property.getNumberOfRepairs());
        this.name=property.getName();
        this.price= String.valueOf(property.getPrice());
    }
    public PropertyViewModel() {
    }

    @Bindable
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
        notifyPropertyChanged(BR.id);
    }
    @Bindable
    public String getCodeSeri() {
        return codeSeri;
    }

    public void setCodeSeri(String codeSeri) {
        this.codeSeri = codeSeri;notifyPropertyChanged(BR.codeSeri);
    }
    @Bindable
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;notifyPropertyChanged(BR.name);

    }
    @Bindable
    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;notifyPropertyChanged(BR.brand);
    }
    @Bindable
    public String getGroupProperty() {
        return groupProperty;
    }

    public void setGroupProperty(String groupProperty) {
        this.groupProperty = groupProperty;notifyPropertyChanged(BR.groupProperty);
    }
    @Bindable
    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;notifyPropertyChanged(BR.price);
    }
    @Bindable
    public String getDateBuy() {
        return dateBuy;
    }

    public void setDateBuy(String dateBuy) {
        this.dateBuy = dateBuy;notifyPropertyChanged(BR.dateBuy);
    }
    @Bindable
    public String getNumberOfRepairs() {
        return numberOfRepairs;
    }

    public void setNumberOfRepairs(String numberOfRepairs) {
        this.numberOfRepairs = numberOfRepairs;notifyPropertyChanged(BR.numberOfRepairs);
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    public String getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(String updatedAt) {
        this.updatedAt = updatedAt;
    }

    public boolean check() {
        if(TextUtils.isEmpty(codeSeri)) return false;
        if(TextUtils.isEmpty(brand)) return false;
        if(TextUtils.isEmpty(groupProperty)) return false;
        if(TextUtils.isEmpty(dateBuy)) return false;
        if(TextUtils.isEmpty(numberOfRepairs)) return false;
        if(TextUtils.isEmpty(name)) return false;
        if(TextUtils.isEmpty(price)) return false;
        return true;
    }
    String dateBuyReverse;
    public void setDateBuyReverse(String format) {
        this.dateBuyReverse=format;
    }

    public String getDateBuyReverse() {
        return dateBuyReverse;
    }
}
