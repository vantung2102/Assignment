package com.example.hrm.Adapters;

import android.app.DatePickerDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.os.Bundle;
import android.os.Handler;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.MenuItem;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.DatePicker;
import android.widget.PopupMenu;
import android.widget.RelativeLayout;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AlertDialog;
import androidx.recyclerview.widget.RecyclerView;

import com.example.hrm.Common;
import com.example.hrm.Constant;
import com.example.hrm.DetailPropertyFragment;
import com.example.hrm.HomeActivity;
import com.example.hrm.PropertiesFragment;
import com.example.hrm.PropertyHistoryFragment;
import com.example.hrm.R;
import com.example.hrm.Response.Attributes;
import com.example.hrm.Response.DataListHasMetaResponse;
import com.example.hrm.Response.DatumTemplate;
import com.example.hrm.Response.StaffAttributes;
import com.example.hrm.Services.APIService;
import com.example.hrm.databinding.AddPropertyDialogBinding;
import com.example.hrm.databinding.PropertyItemBinding;
import com.example.hrm.databinding.UpdatePropertyDialogBinding;
import com.example.hrm.Response.PropertyAttributes;
import com.example.hrm.viewmodel.PropertyViewModel;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.google.gson.reflect.TypeToken;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import okhttp3.RequestBody;
import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class PropertyAdpater extends RecyclerView.Adapter<PropertyAdpater.PerformanceViewholder>{
    private List<PropertyAttributes> data;
    private HomeActivity activity;
    private PropertiesFragment fragment;
    public void setData(List<PropertyAttributes> data, HomeActivity activity, PropertiesFragment fragment){
        this.data=data;
        this.fragment=fragment;
        this.activity = activity;
        notifyDataSetChanged();
    }
    @NonNull
    @Override
    public PerformanceViewholder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        PropertyItemBinding binding=PropertyItemBinding.inflate(LayoutInflater.from(parent.getContext()),parent,false);
        return new PerformanceViewholder(binding);
    }

    @Override
    public void onBindViewHolder(@NonNull PerformanceViewholder holder, int position) {
        if(holder instanceof PerformanceViewholder){
            PropertyAttributes att=data.get(position);
            if(att== null) return;
            holder.binding.txtStt.setText(String.valueOf(position+1));
            holder.binding.txtName.setText(att.getName());
            holder.binding.btnStatus.setText(att.getStatus());
            if(att.getStatus().equals(Common.STATUS_USED)){
                holder.binding.btnStatus.setBackground(activity.getDrawable(R.drawable.layout_rounded_border_red));
                holder.binding.btnStatus.setTextColor(activity.getColor(R.color.toast_failed_bold));
            } else {
                holder.binding.btnStatus.setBackground(activity.getDrawable(R.drawable.layout_rounded_border_green));
                holder.binding.btnStatus.setTextColor(activity.getColor(R.color.toast_success_bold));
            }
            holder.binding.txtName.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    activity.addOrRemoveBackButton(true);
                    DetailPropertyFragment fragment=new DetailPropertyFragment(att,position);
                    Bundle bundle = new Bundle();
                    bundle.putString("TAG",fragment.MY_TAG);
                    fragment.setArguments(bundle);
                    activity.relaceFragment(fragment);
                }
            });
            holder.binding.btnShow.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    activity.addOrRemoveBackButton(true);
                    PropertyHistoryFragment fragment=new PropertyHistoryFragment(att);
                    Bundle bundle = new Bundle();
                    bundle.putString("TAG",fragment.MY_TAG);
                    fragment.setArguments(bundle);
                    activity.relaceFragment(fragment);
                }
            });
            holder.binding.btnMore.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    PopupMenu popup = new PopupMenu(view.getContext(), holder.binding.btnMore);
                    //inflating menu from xml resource
                    popup.inflate(R.menu.edit_delete);
                    //adding click listener
                    popup.setOnMenuItemClickListener(new PopupMenu.OnMenuItemClickListener() {
                        @Override
                        public boolean onMenuItemClick(MenuItem item) {
                            switch (item.getItemId()) {
                                case R.id.btn_edit:
                                    showEditForm(att,position,view.getContext());
                                    return true;
                                case R.id.btn_delete:
                                    Call<ResponseBody> call = APIService.getService().deleteProperty(Common.getToken(), att.getId());
                                        showFormDelete(att,position,view.getContext());
                                        return true;

                                default:
                                    return false;
                            }
                        }
                    });
                    //displaying the popup
                    popup.show();
                }
            });
        }
    }

    private void showFormDelete(PropertyAttributes att, int position, Context context) {
        AlertDialog alertDialog = new AlertDialog.Builder(context).create();
        alertDialog.setTitle("Delete Department");
        String str="Are you sure delete '"+att.getName()+"' ?";
        alertDialog.setMessage(str);
        alertDialog.setIcon(R.drawable.deletetrash);
        alertDialog.setCancelable(true);
        alertDialog.setButton(AlertDialog.BUTTON_POSITIVE, "OK", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                Call<ResponseBody> call = APIService.getService().deleteProperty(Common.getToken(), att.getId());

                call.enqueue(new Callback() {
                    @Override
                    public void onResponse(Call call, Response response) {
                        if(response.isSuccessful()){
                            activity.showToast(true,"Delete Property Successfully!");
                            data.remove(att);
                            notifyItemRemoved(position);
                        } else {
                            activity.showToast(false,"Delete Property Failed!");
                        }
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

    int groupId;
    private void showEditForm(PropertyAttributes property, int pos,Context mContext) {

        PropertyViewModel viewModel=new PropertyViewModel(property);
        groupId=property.getGroupProperty().getId();
        UpdatePropertyDialogBinding binding = UpdatePropertyDialogBinding.inflate(LayoutInflater.from(mContext));
        binding.setProperty(viewModel);
        List<String> groupProperties=new ArrayList<>();
        ArrayAdapter<String> adapter=null;
        ArrayList<Attributes> groupPropertiesAtt=new ArrayList<>();
        Call<DataListHasMetaResponse<DatumTemplate<Attributes>>> call2 = APIService.getService().getAllGroupProperties(Common.getToken());
        try {
            Response<DataListHasMetaResponse<DatumTemplate<Attributes>>> respon = call2.execute();
            if(respon.isSuccessful()){
                respon.body().getData().forEach(item->{groupPropertiesAtt.add(item.getAttributes());groupProperties.add(item.getAttributes().getName());});
                adapter= new ArrayAdapter<>(mContext, android.R.layout.simple_list_item_1, groupProperties.toArray(new String[groupProperties.size()]));
                viewModel.setAdapter(adapter);
                //Log.d("'getCount", String.valueOf(adapter.getCount()));
                //adapter.getCount();
                //binding.AutoCompleteTextViewGroup.setAdapter(adapter);
                //Log.d("'groupProperties", String.valueOf(respon.body().getData().size()));
                int selected=groupProperties.indexOf(viewModel.getGroupProperty());
                viewModel.setGroupProperty(String.valueOf(groupPropertiesAtt.get(selected).getId()));
                binding.AutoCompleteTextViewGroup.setText(groupPropertiesAtt.get(selected).getName(),false);
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        AlertDialog alertDialog = new AlertDialog.Builder(mContext).create();
        alertDialog.setIcon(R.drawable.edit);
        alertDialog.setCancelable(true);
        binding.btnClose.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                alertDialog.dismiss();
            }
        });
        binding.AutoCompleteTextViewGroup.setOnTouchListener(new View.OnTouchListener() {
            @Override
            public boolean onTouch(View view, MotionEvent motionEvent) {
                binding.AutoCompleteTextViewGroup.showDropDown();

                Log.d("'getCount", String.valueOf(binding.AutoCompleteTextViewGroup.getAdapter().getCount()));
                return false;
            }
        });
        binding.AutoCompleteTextViewGroup.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {
                viewModel.setGroupProperty(String.valueOf(groupPropertiesAtt.get(i).getId()));
            }
        });
        binding.idEdtStartDate.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                DatePickerDialog datePickerDialog=new DatePickerDialog(view.getContext(), new DatePickerDialog.OnDateSetListener() {
                    @Override
                    public void onDateSet(DatePicker datePicker, int i, int i1, int i2) {
                        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
                        Calendar c = Calendar.getInstance();
                        c.set(Calendar.YEAR, i);
                        c.set(Calendar.MONTH, i1);
                        c.set(Calendar.DAY_OF_MONTH, i2);
                        String date =  (++i1) +"-" +i2 + "-" + i;
                        viewModel.setDateBuyReverse(format.format(c.getTime()));
                        binding.idEdtStartDate.setText(date);
                    }
                }, LocalDate.now().getYear(),LocalDate.now().getMonth().getValue()-1,LocalDate.now().getDayOfMonth());

                datePickerDialog.getDatePicker().setMinDate(System.currentTimeMillis());
                datePickerDialog.show();
            }
        });
        binding.txtSubmit.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                viewModel.setSubmited(true);
                if(viewModel.check()){{

                    JSONObject parent=new JSONObject();
                    JSONObject dataChild=new JSONObject();
                    try {
                        dataChild.put("brand",viewModel.getBrand());
                        dataChild.put("code_seri",viewModel.getCodeSeri());
                        dataChild.put("date_buy",viewModel.getDateBuyReverse());
                        dataChild.put("group_property_id",viewModel.getGroupProperty());
                        dataChild.put("name",viewModel.getName());
                        dataChild.put("number_of_repairs",Integer.parseInt(viewModel.getNumberOfRepairs()));
                        dataChild.put("price",Double.valueOf(viewModel.getPrice()));
                        parent.put("property",dataChild);
                        RequestBody body = RequestBody.create(okhttp3.MediaType.parse("application/json; charset=utf-8"), parent.toString());
                        Call<JsonObject> call = APIService.getService().updateProperty(Common.getToken(), property.getId(), body);
                        call.enqueue(new Callback<JsonObject>() {
                            @Override
                            public void onResponse(Call<JsonObject> call, Response<JsonObject> response) {
                                if(response.isSuccessful()){
                                    Gson gson= (new GsonBuilder()).setPrettyPrinting().create();
                                    JsonParser parser = new JsonParser();
                                    JsonObject object = (JsonObject) parser.parse(response.body().toString());// response will be the json String
                                    DatumTemplate<PropertyAttributes> data2 = gson.fromJson(object.get("data"), new TypeToken<DatumTemplate<PropertyAttributes>>() {}.getType());
                                    PropertyAttributes proRes=data2.getAttributes();
                                    data.set(0,proRes);
                                    notifyItemChanged(0);
                                    activity.showToast(true,"Update Property Successfully!");
                                } else activity.showToast(false,"Update Property Failed!");
                                alertDialog.dismiss();
                            }

                            @Override
                            public void onFailure(Call<JsonObject> call, Throwable t) {
                                Toast.makeText(mContext, "Update failed", Toast.LENGTH_SHORT).show();
                            }
                        });
                    } catch (JSONException e) {
                        throw new RuntimeException(e);
                    }
                }}
            }
        });



        alertDialog.setView(binding.getRoot());
        alertDialog.show();
    }
    public void showAddForm(Context mContext) {

        PropertyViewModel viewModel=new PropertyViewModel();
        //groupId=property.getGroupProperty().getId();
        AddPropertyDialogBinding binding = AddPropertyDialogBinding.inflate(LayoutInflater.from(mContext));
        binding.setProperty(viewModel);
        List<String> groupProperties=new ArrayList<>();
        ArrayAdapter<String> adapter=null;
        ArrayList<Attributes> groupPropertiesAtt=new ArrayList<>();
        Call<DataListHasMetaResponse<DatumTemplate<Attributes>>> call2 = APIService.getService().getAllGroupProperties(Common.getToken());
        try {
            Response<DataListHasMetaResponse<DatumTemplate<Attributes>>> respon = call2.execute();
            if(respon.isSuccessful()){
                respon.body().getData().forEach(item->{groupPropertiesAtt.add(item.getAttributes());groupProperties.add(item.getAttributes().getName());});
                adapter= new ArrayAdapter<>(mContext, android.R.layout.simple_list_item_1, groupProperties.toArray(new String[groupProperties.size()]));
                viewModel.setAdapter(adapter);
                //Log.d("'getCount", String.valueOf(adapter.getCount()));
                //adapter.getCount();
                //binding.AutoCompleteTextViewGroup.setAdapter(adapter);
                //Log.d("'groupProperties", String.valueOf(respon.body().getData().size()));
//                int selected=groupProperties.indexOf(viewModel.getGroupProperty());
//                groupId=groupPropertiesAtt.get(selected).getId();
//                binding.AutoCompleteTextViewGroup.setText(viewModel.getGroupProperty(),false);
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        AlertDialog alertDialog = new AlertDialog.Builder(mContext).create();
        alertDialog.setIcon(R.drawable.edit);
        alertDialog.setCancelable(true);
        binding.btnClose.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                alertDialog.dismiss();
            }
        });
        binding.AutoCompleteTextViewGroup.setOnTouchListener(new View.OnTouchListener() {
            @Override
            public boolean onTouch(View view, MotionEvent motionEvent) {
                binding.AutoCompleteTextViewGroup.showDropDown();

                Log.d("'getCount", String.valueOf(binding.AutoCompleteTextViewGroup.getAdapter().getCount()));
                return false;
            }
        });
        binding.AutoCompleteTextViewGroup.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {
                viewModel.setGroupProperty(String.valueOf(groupPropertiesAtt.get(i).getId()));
            }
        });
        binding.idEdtStartDate.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                DatePickerDialog datePickerDialog=new DatePickerDialog(view.getContext(), new DatePickerDialog.OnDateSetListener() {
                    @Override
                    public void onDateSet(DatePicker datePicker, int i, int i1, int i2) {
                        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
                        Calendar c = Calendar.getInstance();
                        c.set(Calendar.YEAR, i);
                        c.set(Calendar.MONTH, i1);
                        c.set(Calendar.DAY_OF_MONTH, i2);
                        String date =  (++i1) +"-" +i2 + "-" + i;
                        viewModel.setDateBuyReverse(format.format(c.getTime()));

                        binding.idEdtStartDate.setText(date);
                    }
                }, LocalDate.now().getYear(),LocalDate.now().getMonth().getValue()-1,LocalDate.now().getDayOfMonth());

                //datePickerDialog.getDatePicker().setMinDate(System.currentTimeMillis());
                datePickerDialog.show();
            }
        });
        binding.txtSubmit.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                viewModel.setSubmited(true);
                if(viewModel.check()){{

                    JSONObject parent=new JSONObject();
                    JSONObject dataChild=new JSONObject();
                    try {
                        dataChild.put("brand",viewModel.getBrand());
                        dataChild.put("code_seri",viewModel.getCodeSeri());
                        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
                        dataChild.put("date_buy",viewModel.getDateBuyReverse());
                        dataChild.put("group_property_id",viewModel.getGroupProperty());
                        dataChild.put("name",viewModel.getName());
                        dataChild.put("number_of_repairs",Integer.parseInt(viewModel.getNumberOfRepairs()));
                        dataChild.put("price",Double.valueOf(viewModel.getPrice()));
                        parent.put("property",dataChild);
                        RequestBody body = RequestBody.create(okhttp3.MediaType.parse("application/json; charset=utf-8"), parent.toString());
                        Call<JsonObject> call = APIService.getServiceJson().addProperty(body,Common.getToken());
                        call.enqueue(new Callback<JsonObject>() {
                            @Override
                            public void onResponse(Call<JsonObject> call, Response<JsonObject> response) {
                                if(response.isSuccessful()){
                                    Gson gson= (new GsonBuilder()).setPrettyPrinting().create();
                                    JsonParser parser = new JsonParser();
                                    JsonObject object = (JsonObject) parser.parse(response.body().toString());// response will be the json String
                                    DatumTemplate<PropertyAttributes> data2 = gson.fromJson(object.get("data"), new TypeToken<DatumTemplate<PropertyAttributes>>() {}.getType());
                                    PropertyAttributes proRes=data2.getAttributes();
                                    data.set(0,proRes);
                                    notifyItemChanged(0);
                                    activity.showToast(true,"Update Property Successfully!");
                                } else activity.showToast(false,"Update Property Failed!");
                                alertDialog.dismiss();
                            }

                            @Override
                            public void onFailure(Call<JsonObject> call, Throwable t) {
                                Toast.makeText(mContext, "Update failed", Toast.LENGTH_SHORT).show();
                            }
                        });
                    } catch (JSONException e) {
                        throw new RuntimeException(e);
                    }
                }}
            }
        });



        alertDialog.setView(binding.getRoot());
        alertDialog.show();
    }
    @Override
    public int getItemCount() {
        if(data!=null) return data.size();
        return 0;
    }

    public void setData(int pos, PropertyAttributes propertyAttributes) {
        data.set(pos,propertyAttributes);
        notifyItemChanged(pos);
    }

    class PerformanceViewholder extends RecyclerView.ViewHolder{
        PropertyItemBinding binding;
        public PerformanceViewholder(@NonNull PropertyItemBinding binding) {
            super(binding.getRoot());
            this.binding=binding;
        }
    }
}
