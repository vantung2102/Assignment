package com.example.hrm;

import android.os.Bundle;

import androidx.appcompat.app.AlertDialog;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.ViewModelProvider;

import android.os.Handler;
import android.text.TextUtils;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.AutoCompleteTextView;
import android.widget.ImageView;
import android.widget.RelativeLayout;
import android.widget.TextView;

import com.example.hrm.Model.PropertyWithPosAttributes;
import com.example.hrm.Response.Attributes;
import com.example.hrm.Response.DataResponseList;
import com.example.hrm.Response.DatumTemplate;
import com.example.hrm.ViewModel.PropertyShareViewModel;
import com.example.hrm.ViewModel.StaffShareViewModel;
import com.example.hrm.databinding.AssignPropertyDialogBinding;
import com.example.hrm.databinding.FragmentDetailPropertyBinding;
import com.example.hrm.Response.PropertyAttributes;
import com.example.hrm.Response.StaffAttributes;
import com.example.hrm.Services.APIService;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.google.gson.reflect.TypeToken;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import okhttp3.RequestBody;
import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.Response;

/**
 * A simple {@link Fragment} subclass.
 * Use the {@link DetailPropertyFragment#newInstance} factory method to
 * create an instance of this fragment.
 */
public class DetailPropertyFragment extends Fragment {
    public  static final String MY_TAG= "DetailPropertyFragment";
    // TODO: Rename parameter arguments, choose names that match
    // the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
    private static final String ARG_PARAM1 = "param1";
    private static final String ARG_PARAM2 = "param2";

    // TODO: Rename and change types of parameters
    private String mParam1;
    private String mParam2;

    public DetailPropertyFragment() {
        // Required empty public constructor
    }
    PropertyAttributes attributes;
    int pos;
    public DetailPropertyFragment(PropertyAttributes att, int pos) {
    this.pos=pos;
    this.attributes=att;
    }

    /**
     * Use this factory method to create a new instance of
     * this fragment using the provided parameters.
     *
     * @param param1 Parameter 1.
     * @param param2 Parameter 2.
     * @return A new instance of fragment DetailPropertyFragment.
     */
    // TODO: Rename and change types and number of parameters
    public static DetailPropertyFragment newInstance(String param1, String param2) {
        DetailPropertyFragment fragment = new DetailPropertyFragment();
        Bundle args = new Bundle();
        args.putString(ARG_PARAM1, param1);
        args.putString(ARG_PARAM2, param2);
        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (getArguments() != null) {
            mParam1 = getArguments().getString(ARG_PARAM1);
            mParam2 = getArguments().getString(ARG_PARAM2);
        }
    }
    FragmentDetailPropertyBinding binding;
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        staffShareViewModel = new ViewModelProvider(getActivity()).get(PropertyShareViewModel.class);
        binding=FragmentDetailPropertyBinding.inflate(inflater);
        initButton(false);
        binding.txtStatus.setText(attributes.getStatus());
        binding.txtName.setText(attributes.getName());
        binding.txtBrand.setText(attributes.getBrand());
        binding.txtBuyDate.setText(attributes.getDateBuy());
        binding.txtCodeSeri.setText(attributes.getCodeSeri());
        binding.txtNumberOfRepairs.setText(attributes.getNumberOfRepairs().toString());
        binding.txtGroupProperty.setText(attributes.getGroupProperty().getName());
        binding.txtPrice.setText(attributes.getPrice().toString());
        binding.btnAssign.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                showAssignDialog(view);
            }
        });
        binding.btnRecall.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                recall();
            }
        });
        return binding.getRoot();
    }

    private void recall() {
        try {
            Call<JsonObject> call = APIService.getService().responsePropertyRequest(Common.getToken(), attributes.getId());
            Response<JsonObject> res = call.execute();

            if(res.isSuccessful()){
                Gson gson= (new GsonBuilder()).setPrettyPrinting().create();
                JsonParser parser = new JsonParser();
                JsonObject object = (JsonObject) parser.parse(res.body().toString());// response will be the json String
                DatumTemplate<PropertyAttributes> emp = gson.fromJson(object.get("data"), new TypeToken<DatumTemplate<PropertyAttributes>>() {}.getType());
                PropertyAttributes propertyAttributes=emp.getAttributes();
                attributes=propertyAttributes;
                initButton(true);
                PropertyWithPosAttributes propertyWithPosAttributes=new PropertyWithPosAttributes(attributes,pos);
                staffShareViewModel.setProperty(propertyWithPosAttributes);
                ((HomeActivity)getActivity()).showToast(true,"Recall Property Success!");
            }
            else {
                staffShareViewModel.setProperty(null);
                ((HomeActivity)getActivity()).showToast(false,"Recall Property Failed!");
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    private void initButton(boolean isPutExtra) {
        if(attributes.getStatus().equals(Common.STATUS_USED)){
            binding.btnRecall.setVisibility(View.VISIBLE);
            binding.txtStatus.setText(attributes.getStatus());
            binding.btnAssign.setVisibility(View.GONE);
            binding.txtStatus.setBackground(getContext().getDrawable(R.drawable.layout_rounded_border_red));
            binding.txtStatus.setTextColor(getContext().getColor(R.color.toast_failed_bold));
        } else {
            binding.btnAssign.setVisibility(View.VISIBLE);
            binding.txtStatus.setText(attributes.getStatus());
            binding.btnRecall.setVisibility(View.GONE);
            binding.txtStatus.setBackground(getContext().getDrawable(R.drawable.layout_rounded_border_green));
            binding.txtStatus.setTextColor(getContext().getColor(R.color.toast_success_bold));
        }
    }
    private PropertyShareViewModel staffShareViewModel;
    List<StaffAttributes> staff;
    ArrayList<String> staffNames=new ArrayList<>();
    interface  Ido{
        void updateDialog(AssignPropertyDialogBinding viewBinding );
    }
    int staffId=-1;
    private void showAssignDialog(View view) {
        final View view2 = LayoutInflater.from(getContext()).inflate(R.layout.assign_property_dialog, null);
        final AutoCompleteTextView autoCompleteTextView = (AutoCompleteTextView) view2.findViewById(R.id.AutoCompleteTextView);
        final ImageView btn_close = (ImageView) view2.findViewById(R.id.btn_close);
        final TextView txtSubmit = (TextView) view2.findViewById(R.id.txtSubmit);
        final TextView txt_mess = (TextView) view2.findViewById(R.id.txt_mess);
        AlertDialog alertDialog = new AlertDialog.Builder(getContext()).create();
            if(staff==null) {
                staff=new ArrayList<>();
                Call<DataResponseList<DatumTemplate<StaffAttributes>>> call = APIService.getService().getAllStaff(Common.getToken());
                try {
                    Response<DataResponseList<DatumTemplate<StaffAttributes>>> response = call.execute();
                    response.body().getData().forEach(item->{staff.add(item.getAttributes());staffNames.add(item.getAttributes().getFullname());});
                    autoCompleteTextView.setAdapter(new ArrayAdapter<>(view.getContext(), android.R.layout.simple_list_item_1,staffNames.toArray(new String[staffNames.size()])));
                    alertDialog.setView(view2);
                    alertDialog.show();
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }else{
                autoCompleteTextView.setAdapter(new ArrayAdapter<>(view.getContext(), android.R.layout.simple_list_item_1,staffNames.toArray(new String[staffNames.size()])));
                alertDialog.setView(view2);
                alertDialog.show();
        }
        btn_close.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                alertDialog.dismiss();
            }
        });
        autoCompleteTextView.setOnTouchListener(new View.OnTouchListener() {
            @Override
            public boolean onTouch(View view, MotionEvent motionEvent) {
                autoCompleteTextView.showDropDown();
                return false;
            }
        });

        autoCompleteTextView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {
                staffId=staff.get(i).getId();
            }
        });
        txtSubmit.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                    String staff=autoCompleteTextView.getText().toString();
                    if(TextUtils.isEmpty(staff)){
                        txt_mess.setVisibility(View.GONE);
                        return;
                    }
                    if(staffId!=-1) {
                        JSONObject data=new JSONObject();
                        try {
                            data.put("receiver_id", String.valueOf(staffId));
                            RequestBody body = RequestBody.create(okhttp3.MediaType.parse("application/json; charset=utf-8"), data.toString());
                            Call<JsonObject> call = APIService.getService().responsePropertyRequest(Common.getToken(), attributes.getId(), body);
                            Response<JsonObject> res = call.execute();
                            alertDialog.dismiss();

                            if(res.isSuccessful()){
                                Gson gson= (new GsonBuilder()).setPrettyPrinting().create();
                                JsonParser parser = new JsonParser();
                                JsonObject object = (JsonObject) parser.parse(res.body().toString());// response will be the json String
                                DatumTemplate<PropertyAttributes> emp = gson.fromJson(object.get("data"), new TypeToken<DatumTemplate<PropertyAttributes>>() {}.getType());
                                PropertyAttributes propertyAttributes=emp.getAttributes();
                                attributes=propertyAttributes;
                                initButton(true);
                                PropertyWithPosAttributes propertyWithPosAttributes=new PropertyWithPosAttributes(attributes,pos);
                                staffShareViewModel.setProperty(propertyWithPosAttributes);
                                ((HomeActivity)getActivity()).showToast(true,"Assign Property Success!");
                            }
                            else {
                                staffShareViewModel.setProperty(null);
                                ((HomeActivity)getActivity()).showToast(false,"Assign Property Failed!");
                            }
                        } catch (JSONException e) {
                            throw new RuntimeException(e);
                        } catch (IOException e) {
                            throw new RuntimeException(e);
                        }
                    }
            }
        });
    }

}