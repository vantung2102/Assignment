package com.example.hrm.Adapters;

import android.content.Context;
import android.content.DialogInterface;
import android.os.Bundle;
import android.util.Log;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AlertDialog;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.RecyclerView;

import com.example.hrm.Common;
import com.example.hrm.DetailLeaveApplicationFragment;
import com.example.hrm.HomeActivity;
import com.example.hrm.R;
import com.example.hrm.Response.Attributes;
import com.example.hrm.Response.LeaveApplicationAttributes;
import com.example.hrm.Response.StaffLeaveAttributes;
import com.example.hrm.Services.APIService;
import com.example.hrm.StaffTimeOffFragment;
import com.example.hrm.databinding.ItemLoadBinding;
import com.example.hrm.databinding.LeaveApplicationItemBinding;
import com.example.hrm.databinding.LeaveItemBinding;

import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class LeaveApplicationAdapter extends RecyclerView.Adapter<RecyclerView.ViewHolder>{
    List<LeaveApplicationAttributes> data;
    final  int ITEM_TYPE=1;
    final  int LOADING_TYPE=2;
    String type;
    @Override
    public int getItemViewType(int position) {
        return data.get(position) == null ? LOADING_TYPE : ITEM_TYPE;
    }

    HomeActivity homeActivity;
    public void setData(List<LeaveApplicationAttributes> data,HomeActivity homeActivity,String type){
        this.homeActivity=homeActivity;
        this.data=data;
        this.type=type;
        notifyDataSetChanged();
    }
    @NonNull
    @Override
    public RecyclerView.ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        switch (viewType){
            case ITEM_TYPE:
                LeaveApplicationItemBinding leaveItemBinding=LeaveApplicationItemBinding.inflate(LayoutInflater.from(parent.getContext()),parent,false);
                return new LeaveViewholder(leaveItemBinding);
            case LOADING_TYPE:
                ItemLoadBinding itemLoadBinding=ItemLoadBinding.inflate(LayoutInflater.from(parent.getContext()),parent,false);
                return new LoadingViewholder(itemLoadBinding);
            default:
                LeaveApplicationItemBinding leaveItemBin2ding=LeaveApplicationItemBinding.inflate(LayoutInflater.from(parent.getContext()),parent,false);
                return new LeaveViewholder(leaveItemBin2ding);
        }
    }



    @Override
    public void onBindViewHolder(@NonNull RecyclerView.ViewHolder holder, int position) {
        if(holder instanceof LeaveViewholder){
            LeaveViewholder leaveViewholder=(LeaveViewholder)holder;
            LeaveApplicationAttributes att=data.get(position);
            Log.d("att",att.toString());
            leaveViewholder.leaveItemBinding.txtName.setText(att.getStaff().getFullname());
            leaveViewholder.leaveItemBinding.txtStt.setText(String.valueOf(position+1));
            leaveViewholder.leaveItemBinding.txtTotalDay.setText(String.valueOf(att.getNumberOfDaysOff()));
            leaveViewholder.leaveItemBinding.btnShow.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    DetailLeaveApplicationFragment fragment=new DetailLeaveApplicationFragment(att);
                    Bundle bundle=new Bundle();
                    bundle.putString("TAG","Detail leave application");
                    bundle.putString("TYPE",type);
                    fragment.setArguments(bundle);
                    homeActivity.relaceFragment(fragment);
                }
            });
            leaveViewholder.leaveItemBinding.btnDelete.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    showDelete(att,view.getContext(),position);
                }
            });
        }
        else if(holder instanceof LoadingViewholder){

        }

    }
    private void showDelete(LeaveApplicationAttributes att, Context mContext,int pos) {
        AlertDialog alertDialog = new AlertDialog.Builder(mContext).create();
        alertDialog.setTitle("Delete Leave Application");
        String str="Are you sure delete '"+att.getStaff().getFullname()+"' ?";
        alertDialog.setMessage(str);
        alertDialog.setIcon(R.drawable.deletetrash);
        alertDialog.setCancelable(true);
        alertDialog.setButton(AlertDialog.BUTTON_POSITIVE, "Delete", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                Toast.makeText(mContext, "Delete", Toast.LENGTH_SHORT).show();
                Call call= APIService.getService().deleteLeaveApplication(Common.getToken(),att.getId());
                call.enqueue(new Callback() {
                    @Override
                    public void onResponse(Call call, Response response) {
                        LayoutInflater layoutInflater=homeActivity.getLayoutInflater();
                        View layout=null;
                     if(response.isSuccessful()){
                        data.remove(att);
                         layout = layoutInflater.inflate(R.layout.toast_success,(ViewGroup) homeActivity.findViewById(R.id.custom_toast_layout));
                         notifyItemRemoved(pos);
                     }
                     else {
                         layout = layoutInflater.inflate(R.layout.toast_failed,(ViewGroup) homeActivity.findViewById(R.id.custom_toast_layout));
                     }
                        Toast toast = new Toast(mContext);
                        toast.setDuration(Toast.LENGTH_SHORT);
                        toast.setGravity(Gravity.BOTTOM, 0, 0);
                        toast.setView(layout);//setting the view of custom toast layout
                        toast.show();
                    }

                    @Override
                    public void onFailure(Call call, Throwable t) {

                    }
                });
            }
        });


        alertDialog.setButton(AlertDialog.BUTTON_NEGATIVE, "Cancel", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                alertDialog.dismiss();
            }
        });

        alertDialog.show();
    }
    public void relaceFragment(Fragment fragment){

    }
    @Override
    public int getItemCount() {
        if(data!=null) return data.size();
        return 0;
    }

    public List<LeaveApplicationAttributes>  getData() {
        return  this.data;
    }

    class LeaveViewholder extends RecyclerView.ViewHolder{
        LeaveApplicationItemBinding leaveItemBinding;
        public LeaveViewholder(@NonNull LeaveApplicationItemBinding leaveItemBinding) {
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
