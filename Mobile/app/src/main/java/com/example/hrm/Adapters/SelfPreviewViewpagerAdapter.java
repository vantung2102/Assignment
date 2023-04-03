package com.example.hrm.Adapters;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentActivity;
import androidx.viewpager2.adapter.FragmentStateAdapter;

import com.example.hrm.SelfPreviewFinishedFragment;
import com.example.hrm.SelfPreviewInProgressFragment;

public class SelfPreviewViewpagerAdapter extends FragmentStateAdapter {
    public SelfPreviewViewpagerAdapter(@NonNull FragmentActivity fragmentActivity) {
        super(fragmentActivity);
    }

    @NonNull
    @Override
    public Fragment createFragment(int position) {
        switch (position){
            case 0:
                return new SelfPreviewInProgressFragment();
            case 1:
                return new SelfPreviewFinishedFragment();
            default:
                return new SelfPreviewInProgressFragment();
        }
    }

    @Override
    public int getItemCount() {
        return 2;
    }
}
