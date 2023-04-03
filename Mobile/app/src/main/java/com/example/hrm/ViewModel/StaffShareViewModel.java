package com.example.hrm.ViewModel;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

import com.example.hrm.Response.Staff;
import com.example.hrm.Response.StaffAttributes;

public class StaffShareViewModel extends ViewModel {
    MutableLiveData<StaffAttributes> staffData=new MutableLiveData<>();

    public LiveData<StaffAttributes> getStaff() {
        return staffData;
    }

    public void setStaff(StaffAttributes staff) {
        staffData.setValue(staff);
    }
}
