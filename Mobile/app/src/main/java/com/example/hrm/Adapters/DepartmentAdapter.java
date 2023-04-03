package com.example.hrm.Adapters;

import android.content.Context;
import android.content.DialogInterface;
import android.text.TextUtils;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AlertDialog;
import androidx.recyclerview.widget.RecyclerView;

import com.example.hrm.Common;
import com.example.hrm.Constant;
import com.example.hrm.HomeActivity;
import com.example.hrm.R;
import com.example.hrm.Response.Attributes;
import com.example.hrm.Services.APIService;
import com.example.hrm.databinding.DepartmentItemBinding;
import com.example.hrm.databinding.ItemLoadBinding;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.List;

import okhttp3.RequestBody;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class DepartmentAdapter  extends RecyclerView.Adapter<RecyclerView.ViewHolder> {
    List<Attributes> desDepartments;
    private LayoutInflater layoutInflater;
    Context mContext;
    String type= Constant.DEPARTMENT_TYPE;
    final  int ITEM_TYPE=1;
    final  int LOADING_TYPE=2;
    @Override
    public int getItemViewType(int position) {
        return desDepartments.get(position) == null ? LOADING_TYPE : ITEM_TYPE;
    }
    public DepartmentAdapter(String type) {
        this.type = type;
    }
    private  HomeActivity activity;
    public void setData(List<Attributes> desDepartments, Context mContext,HomeActivity activity){
        this.activity=activity;
        this.type=type;
        this.desDepartments=desDepartments;
        this.mContext=mContext;
        notifyDataSetChanged();
    }
    @NonNull
    @Override
    public RecyclerView.ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {

        switch (viewType){
            case ITEM_TYPE:
                DepartmentItemBinding departmentItemBinding=DepartmentItemBinding.inflate(LayoutInflater.from(parent.getContext()),parent,false);
                return  new DepartmentViewHolder(departmentItemBinding);
            case LOADING_TYPE:
                ItemLoadBinding itemLoadBinding=ItemLoadBinding.inflate(LayoutInflater.from(parent.getContext()),parent,false);
                return new LoadingViewholder(itemLoadBinding);
            default:
                DepartmentItemBinding departmentItemBinding2=DepartmentItemBinding.inflate(LayoutInflater.from(parent.getContext()),parent,false);
                return  new DepartmentViewHolder(departmentItemBinding2);
        }
    }

    @Override
    public void onBindViewHolder(@NonNull RecyclerView.ViewHolder holder, int position) {
        if(holder instanceof DepartmentViewHolder){
            DepartmentViewHolder holder2=(DepartmentViewHolder) holder;
            Attributes att=desDepartments.get(position);
            if(att== null) return;
            if(type.equals(Constant.DEPARTMENT_TYPE)||type.equals(Constant.PROPERTIES_GROUP_TYPE)){
                holder2.departmentItemBinding.txtDepartmentName.setText(att.getName());
            }
            else if(type.equals(Constant.JOBTITLE_TYPE)){
                Log.d("att",att.toString());
                Log.d("here","JOBTITLE_TYPE");
                holder2.departmentItemBinding.txtDepartmentName.setText(att.getTitle());
            }
            else if(type.equals(Constant.POSITION_TYPE)){
                holder2.departmentItemBinding.txtDepartmentName.setText(att.getName());
            }
            holder2.departmentItemBinding.txtStt.setText(String.valueOf(position+1));
            holder2.departmentItemBinding.btnEdit.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    showEditForm(att,position,type);
                }
            });
            holder2.departmentItemBinding.btnDelete.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    showDelete(att,position);
                }
            });
        }
    }


    private void showDelete(Attributes department,int pos) {
        AlertDialog alertDialog = new AlertDialog.Builder(mContext).create();
        alertDialog.setTitle("Delete Department");
        String str="Are you sure delete '"+department.getName()+"' ?";
        alertDialog.setMessage(str);
        alertDialog.setIcon(R.drawable.deletetrash);
        alertDialog.setCancelable(true);
        alertDialog.setButton(AlertDialog.BUTTON_POSITIVE, "OK", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                Call call=null;
                switch (type){
                    case Constant.DEPARTMENT_TYPE:
                        call=APIService.getService().deleteDepartment(Common.getToken(),department.getId());
                        break;
                    case Constant.JOBTITLE_TYPE:
                        call=APIService.getService().deleteJobtitle(Common.getToken(),department.getId());
                        break;
                    case Constant.POSITION_TYPE:
                        call=APIService.getService().deletePosition(Common.getToken(),department.getId());
                        break;
                    case Constant.PROPERTIES_GROUP_TYPE:
                        call=APIService.getService().deletePropertyGroup(Common.getToken(),department.getId());
                        break;
                }
                call.enqueue(new Callback() {
                    @Override
                    public void onResponse(Call call, Response response) {
                        if(response.isSuccessful()){
                            desDepartments.remove(department);
                            notifyItemRemoved(pos);
                            activity.showToast(true,"Delete success!");
                        } else activity.showToast(true,"Delete failed!");
                    }

                    @Override
                    public void onFailure(Call call, Throwable t) {
                        activity.showToast(true,"Delete failed!");
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

    private void showEditForm(Attributes department, int pos, String type) {
        final View view = LayoutInflater.from(mContext).inflate(R.layout.add_department_dialog, null);
        AlertDialog alertDialog = new AlertDialog.Builder(mContext).create();
        alertDialog.setTitle("Update "+type);
        alertDialog.setIcon(R.drawable.edit);
        alertDialog.setCancelable(true);
//        alertDialog.setMessage("Your Message Here");


        final EditText edt_name = (EditText) view.findViewById(R.id.edt_name);
        switch (type){
            case Constant.DEPARTMENT_TYPE:
                edt_name.setText(department.getName());
                break;
            case Constant.JOBTITLE_TYPE:
                edt_name.setText(department.getTitle());
                break;
            case Constant.POSITION_TYPE:
            case Constant.PROPERTIES_GROUP_TYPE:
                edt_name.setText(department.getName());
                break;
        }

        final EditText edt_des = (EditText) view.findViewById(R.id.edt_des);
        TextView txtMessName=view.findViewById(R.id.txt_mess_name);
        TextView txtMessDes=view.findViewById(R.id.txt_mess_des);
        edt_des.setText(department.getDescription());
        alertDialog.setButton(AlertDialog.BUTTON_POSITIVE,"Update", (DialogInterface.OnClickListener) null);
        //
        alertDialog.setOnShowListener(new DialogInterface.OnShowListener() {
            @Override
            public void onShow(DialogInterface dialogInterface) {
                alertDialog.getButton(AlertDialog.BUTTON_POSITIVE).setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View view) {
                        JSONObject data=new JSONObject();
                        JSONObject dataChild=new JSONObject();
                        try {
                            String desName=edt_name.getText().toString().trim();
                            String desdes=edt_des.getText().toString().trim();
                            if(TextUtils.isEmpty(desName)){
                                txtMessName.setText("Name is required");
                                txtMessName.setVisibility(View.VISIBLE);
                                return;
                            } else if(TextUtils.isEmpty(desdes)){
                                txtMessName.setVisibility(View.GONE);
                                txtMessDes.setVisibility(View.VISIBLE);
                                txtMessDes.setText("Description is required");
                                return;
                            }
                            else {
                                txtMessDes.setVisibility(View.GONE);
                                txtMessName.setVisibility(View.GONE);
                            }
                            switch (type){
                                case Constant.DEPARTMENT_TYPE:
                                case Constant.PROPERTIES_GROUP_TYPE:
                                    dataChild.put("name",desName);
                                    break;
                                case Constant.JOBTITLE_TYPE:
                                    dataChild.put("title",desName);
                                    break;
                                case Constant.POSITION_TYPE:
                                    dataChild.put("name",desName);
                                    break;
                            }

                            dataChild.put("description",desdes);
                            data.put(DepartmentAdapter.this.type,dataChild);
                            RequestBody body = RequestBody.create(okhttp3.MediaType.parse("application/json; charset=utf-8"), data.toString());
                            Call call=null;
                            switch (type){
                                case Constant.DEPARTMENT_TYPE:
                                    call=APIService.getService().updateDepartment(Common.getToken(),department.getId(),body);
                                    break;
                                case Constant.JOBTITLE_TYPE:
                                    call=APIService.getService().updateJobtitle(Common.getToken(),department.getId(),body);
                                    break;
                                case Constant.POSITION_TYPE:
                                    call=APIService.getService().updatePosition(Common.getToken(),department.getId(),body);
                                    break;
                                case Constant.PROPERTIES_GROUP_TYPE:
                                    call=APIService.getService().updatePrppertyGroup(Common.getToken(),department.getId(),body);
                                    break;
                            }

                            call.enqueue(new Callback() {
                                @Override
                                public void onResponse(Call call, Response response) {
                                    if(response.isSuccessful()){
                                        //Log.d("updated",department.getName());
                                        switch (type){
                                            case Constant.DEPARTMENT_TYPE:
                                                desDepartments.get(pos).setName(desName);
                                                break;
                                            case Constant.JOBTITLE_TYPE:
                                                desDepartments.get(pos).setTitle(desName);
                                                break;
                                            case Constant.POSITION_TYPE:
                                            case Constant.PROPERTIES_GROUP_TYPE:
                                                desDepartments.get(pos).setName(desName);
                                                break;
                                        }

                                        desDepartments.get(pos).setDescription(desdes);
                                        notifyItemChanged(pos);
                                        activity.showToast(true,"Update successfully!");
                                        //Toast.makeText(mContext, "Update successfully!", Toast.LENGTH_LONG).show();
                                    } else {
                                        //Log.d("Update failed",department.getName());
                                        //Toast.makeText(mContext, "Update failed!", Toast.LENGTH_LONG).show();
                                        activity.showToast(false,"Update failed!");
                                    }
                                    alertDialog.dismiss();
                                }

                                @Override
                                public void onFailure(Call call, Throwable t) {
                                    Log.d("Update failed",department.getName());
                                    activity.showToast(false,"Update failed!");
                                    //Toast.makeText(mContext, "Update failed!", Toast.LENGTH_SHORT).show();
                                    alertDialog.dismiss();
                                }
                            });
                        } catch (JSONException e) {
                            throw new RuntimeException(e);
                        }
                    }
                });
            }
        });
        //


        alertDialog.setButton(AlertDialog.BUTTON_NEGATIVE, "Cancel", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                alertDialog.dismiss();
            }
        });


        alertDialog.setView(view);
        alertDialog.show();
    }

    @Override
    public int getItemCount() {
        if(desDepartments!=null) return desDepartments.size();
        return 0;
    }

    class DepartmentViewHolder extends RecyclerView.ViewHolder{
        DepartmentItemBinding departmentItemBinding;
        public DepartmentViewHolder(@NonNull DepartmentItemBinding departmentItemBinding) {
            super(departmentItemBinding.getRoot());
            this.departmentItemBinding=departmentItemBinding;
        }
        //DepartmentItemBinding departmentItemBinding;

    }
    class LoadingViewholder extends RecyclerView.ViewHolder{
        ItemLoadBinding itemLoadBinding;
        public LoadingViewholder(@NonNull ItemLoadBinding itemLoadBinding) {
            super(itemLoadBinding.getRoot());
            this.itemLoadBinding=itemLoadBinding;
        }
    }
}
