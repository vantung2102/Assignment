package com.example.hrm.ViewModel;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

import com.example.hrm.Model.PropertyWithPosAttributes;
import com.example.hrm.Response.PropertyAttributes;
import com.example.hrm.Response.StaffAttributes;

public class PropertyShareViewModel extends ViewModel {
    MutableLiveData<PropertyWithPosAttributes> propertyData=new MutableLiveData<>();
    MutableLiveData<Integer> positionData=new MutableLiveData<>();
    public LiveData<PropertyWithPosAttributes> getProperty() {
        return propertyData;
    }
    public void setProperty(PropertyWithPosAttributes staff) {
        propertyData.setValue(staff);
    }

}
