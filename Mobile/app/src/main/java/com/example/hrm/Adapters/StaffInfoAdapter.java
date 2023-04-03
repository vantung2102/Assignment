package com.example.hrm.Adapters;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.viewpager2.adapter.FragmentStateAdapter;

import com.example.hrm.Response.Staff;
import com.example.hrm.Response.StaffAttributes;
import com.example.hrm.StaffInfoFragment;
import com.example.hrm.StaffOnboardingFragment;
import com.example.hrm.StaffProfileFragment;
import com.example.hrm.StaffTimeOffFragment;

public class StaffInfoAdapter extends FragmentStateAdapter {
    public StaffInfoAdapter(@NonNull Fragment fragment) {
        super(fragment);
    }
    StaffAttributes staffAttributes;
    public StaffInfoAdapter(StaffInfoFragment fragment, StaffAttributes staffAttributes) {
        super(fragment);
        this.staffAttributes=staffAttributes;
    }

    @NonNull
    @Override
    public Fragment createFragment(int position) {
           switch (position){
               case 0:
                   return new StaffProfileFragment(staffAttributes);
               case 1:
                   return new StaffTimeOffFragment(staffAttributes.getId());
               case 2:
                   return new StaffOnboardingFragment(staffAttributes.getId());
               default:
                   return new StaffProfileFragment();
           }
    }

    @Override
    public int getItemCount() {
        return 3;
    }
}
