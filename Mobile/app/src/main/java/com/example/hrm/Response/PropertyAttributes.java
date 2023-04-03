package com.example.hrm.Response;


import androidx.databinding.BaseObservable;
import androidx.databinding.Bindable;

import javax.annotation.Generated;

import com.example.hrm.BR;
import com.example.hrm.Response.Attributes;
import com.google.gson.annotations.Expose;
        import com.google.gson.annotations.SerializedName;

import java.io.Serializable;

@Generated("jsonschema2pojo")
public class PropertyAttributes extends BaseObservable implements Serializable {

    @SerializedName("id")
    @Expose
    private Integer id;
    @SerializedName("code_seri")
    @Expose
    private String codeSeri;
    @SerializedName("name")
    @Expose
    private String name;
    @SerializedName("brand")
    @Expose
    private String brand;
    @SerializedName("group_property")
    @Expose
    private Attributes groupProperty;
    @SerializedName("price")
    @Expose
    private Double price;
    @SerializedName("date_buy")
    @Expose
    private String dateBuy;
    @SerializedName("number_of_repairs")
    @Expose
    private Integer numberOfRepairs;
    @SerializedName("status")
    @Expose
    private String status;
    @SerializedName("created_at")
    @Expose
    private String createdAt;
    @SerializedName("updated_at")
    @Expose
    private String updatedAt;
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
    public Attributes getGroupProperty() {
        return groupProperty;
    }

    public void setGroupProperty(Attributes groupProperty) {
        this.groupProperty = groupProperty;notifyPropertyChanged(BR.groupProperty);
    }
    @Bindable
    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
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
    public Integer getNumberOfRepairs() {
        return numberOfRepairs;
    }

    public void setNumberOfRepairs(Integer numberOfRepairs) {
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

}
