package com.example.hrm.Adapters;

import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.hrm.HomeActivity;
import com.example.hrm.NewEmployeeFragment;
import com.example.hrm.R;
import com.example.hrm.Response.StaffLeaveAttributes;
import com.example.hrm.StaffTimeOffFragment;
import com.example.hrm.databinding.ItemLoadBinding;
import com.example.hrm.databinding.LeaveItemBinding;

import java.util.Collection;
import java.util.List;

public class LeaveAdapter extends RecyclerView.Adapter<RecyclerView.ViewHolder>{
    List<StaffLeaveAttributes> data;
    final  int ITEM_TYPE=1;
    final  int LOADING_TYPE=2;
    @Override
    public int getItemViewType(int position) {
        return data.get(position) == null ? LOADING_TYPE : ITEM_TYPE;
    }

    HomeActivity homeActivity;
    public void setData(List<StaffLeaveAttributes> data,HomeActivity homeActivity){
        this.homeActivity=homeActivity;
        this.data=data;
        notifyDataSetChanged();
    }
    @NonNull
    @Override
    public RecyclerView.ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        switch (viewType){
            case ITEM_TYPE:
                LeaveItemBinding leaveItemBinding=LeaveItemBinding.inflate(LayoutInflater.from(parent.getContext()),parent,false);
                return new LeaveViewholder(leaveItemBinding);
            case LOADING_TYPE:
                ItemLoadBinding itemLoadBinding=ItemLoadBinding.inflate(LayoutInflater.from(parent.getContext()),parent,false);
                return new LoadingViewholder(itemLoadBinding);
            default:
                LeaveItemBinding leaveItemBin2ding=LeaveItemBinding.inflate(LayoutInflater.from(parent.getContext()),parent,false);
                return new LeaveViewholder(leaveItemBin2ding);
        }
    }



    @Override
    public void onBindViewHolder(@NonNull RecyclerView.ViewHolder holder, int position) {
        if(holder instanceof LeaveViewholder){
            LeaveViewholder leaveViewholder=(LeaveViewholder)holder;
            StaffLeaveAttributes att=data.get(position);
            Log.d("att",att.toString());
            leaveViewholder.leaveItemBinding.txtName.setText(att.getStaff().getFullname());
            leaveViewholder.leaveItemBinding.txtStt.setText(String.valueOf(position+1));
            leaveViewholder.leaveItemBinding.btnShow.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    //Toast.makeText(view.getContext(), "click", Toast.LENGTH_SHORT).show();
                    //homeActivity.addOrRemoveBackButton(true);
                    StaffTimeOffFragment fragment=new StaffTimeOffFragment(att);
                    final Bundle args = new Bundle();
                    args.putString("TAG", StaffTimeOffFragment.MY_TAG);
                    fragment.setArguments(args);
                    homeActivity.relaceFragment(fragment);
                }
            });
        }
        else if(holder instanceof LoadingViewholder){

        }

    }
    public void relaceFragment(Fragment fragment){

    }
    @Override
    public int getItemCount() {
        if(data!=null) return data.size();
        return 0;
    }

    public List<StaffLeaveAttributes>  getData() {
        return  this.data;
    }

    class LeaveViewholder extends RecyclerView.ViewHolder{
        LeaveItemBinding leaveItemBinding;
        public LeaveViewholder(@NonNull LeaveItemBinding leaveItemBinding) {
            super(leaveItemBinding.getRoot());
            this.leaveItemBinding=leaveItemBinding;
        }
    }
    class LoadingViewholder extends RecyclerView.ViewHolder{
        ItemLoadBinding itemLoadBinding;
        public LoadingViewholder(@NonNull ItemLoadBinding itemLoadBinding) {
            super(itemLoadBinding.getRoot());
            this.itemLoadBinding=itemLoadBinding;
        }
    }
}
