package com.example.hrm.Adapters;

import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.RecyclerView;

import com.example.hrm.HomeActivity;
import com.example.hrm.OnboardingSampleFragment;
import com.example.hrm.Response.LeaveApplicationAttributes;
import com.example.hrm.Response.OnboardingByStaffAttributes;
import com.example.hrm.Response.OnboardingSampleStepAtrributes;
import com.example.hrm.Response.StaffLeaveAttributes;
import com.example.hrm.StaffTimeOffFragment;
import com.example.hrm.databinding.ItemLoadBinding;
import com.example.hrm.databinding.LeaveApplicationItemBinding;
import com.example.hrm.databinding.LeaveItemBinding;
import com.example.hrm.databinding.OnboardingItemBinding;
import com.example.hrm.databinding.OnboardingSampleItemBinding;

import java.util.List;

public class OnboardingSampleStepAdapter extends RecyclerView.Adapter<RecyclerView.ViewHolder>{
    List<OnboardingSampleStepAtrributes> data;
    List<OnboardingSampleStepAtrributes> current;
    Boolean isShowCurrent=false;
    final  int ITEM_TYPE=1;
    final  int LOADING_TYPE=2;
    @Override
    public int getItemViewType(int position) {
        return data.get(position) == null ? LOADING_TYPE : ITEM_TYPE;
    }

    HomeActivity homeActivity;
    public void setData(List<OnboardingSampleStepAtrributes> data, HomeActivity homeActivity){
        this.homeActivity=homeActivity;
        this.data=data;
        notifyDataSetChanged();
    }
    @NonNull
    @Override
    public RecyclerView.ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        switch (viewType){
            case ITEM_TYPE:
                OnboardingSampleItemBinding leaveItemBinding=OnboardingSampleItemBinding.inflate(LayoutInflater.from(parent.getContext()),parent,false);
                return new LeaveViewholder(leaveItemBinding);
            case LOADING_TYPE:
                ItemLoadBinding itemLoadBinding=ItemLoadBinding.inflate(LayoutInflater.from(parent.getContext()),parent,false);
                return new LoadingViewholder(itemLoadBinding);
            default:
                OnboardingSampleItemBinding leaveItemBin2ding=OnboardingSampleItemBinding.inflate(LayoutInflater.from(parent.getContext()),parent,false);
                return new LeaveViewholder(leaveItemBin2ding);
        }
    }



    @Override
    public void onBindViewHolder(@NonNull RecyclerView.ViewHolder holder, int position) {
        if(holder instanceof LeaveViewholder){
            LeaveViewholder leaveViewholder= (LeaveViewholder) holder;
            OnboardingSampleStepAtrributes att;
            if(!isShowCurrent){
                att=data.get(position);
            } else att=current.get(position);

            Log.d("att",att.toString());
            leaveViewholder.leaveItemBinding.txtName.setText(att.getPosition().getName());
            leaveViewholder.leaveItemBinding.txtTotalDay.setText(att.getTask());
            leaveViewholder.leaveItemBinding.txtStt.setText(String.valueOf(position+1));
            leaveViewholder.leaveItemBinding.btnShow.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    iOnClick.showDialog(att,view,position);
                }
            });
            leaveViewholder.leaveItemBinding.btnDelete.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    iOnClick.showDialogDelete(att,view,holder.getAdapterPosition());
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
        if(!this.isShowCurrent){
            if(data!=null) return data.size();
        } else {
            if(current!=null) return current.size();
        }

        return 0;
    }

    public List<OnboardingSampleStepAtrributes>  getData() {
        return  this.data;
    }
    OnboardingSampleFragment.IOnClick iOnClick;
    public void setIOnClick(OnboardingSampleFragment.IOnClick iOnClick) {
            this.iOnClick=iOnClick;
    }

    public void showFilterData(List<OnboardingSampleStepAtrributes> newData) {
        this.isShowCurrent=true;
        this.current=newData;
        notifyDataSetChanged();
    }
    public void deleteItem(OnboardingSampleStepAtrributes att,int pos){
        if(isShowCurrent){
            if(this.current!=null&&(this.current.size()>pos)){
                this.current.remove(att);this.data.remove(att);
                notifyItemRemoved(pos);
            }
        } else {
            if(this.data!=null&&(this.data.size()>pos)){
                this.data.remove(att);
                notifyItemRemoved(pos);
            }
        }
    }
    public void showRawData() {
        this.isShowCurrent=false;
        notifyDataSetChanged();
    }
    class LeaveViewholder extends RecyclerView.ViewHolder{
        OnboardingSampleItemBinding leaveItemBinding;
        public LeaveViewholder(@NonNull OnboardingSampleItemBinding leaveItemBinding) {
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
