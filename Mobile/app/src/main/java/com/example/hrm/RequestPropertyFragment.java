package com.example.hrm;

import android.content.Context;
import android.os.Bundle;

import androidx.appcompat.app.AlertDialog;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.DividerItemDecoration;
import androidx.recyclerview.widget.LinearLayoutManager;

import android.os.StrictMode;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.RelativeLayout;
import android.widget.Toast;

import com.example.hrm.Adapters.RequestPropertyAdapter;
import com.example.hrm.Response.Attributes;
import com.example.hrm.Response.DataListHasMetaResponse;
import com.example.hrm.Response.DatumTemplate;
import com.example.hrm.Response.Department;
import com.example.hrm.Response.PropertyAttributes;
import com.example.hrm.Response.RequestPropertyAttributes;
import com.example.hrm.Services.APIService;
import com.example.hrm.databinding.AddRequestDialogBinding;
import com.example.hrm.databinding.FragmentRequestPropertyBinding;
import com.example.hrm.viewmodel.RequestPropertyVIewModel;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.google.gson.reflect.TypeToken;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import okhttp3.RequestBody;
import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

/**
 * A simple {@link Fragment} subclass.
 * Use the {@link RequestPropertyFragment#newInstance} factory method to
 * create an instance of this fragment.
 */
public class RequestPropertyFragment extends Fragment {
    public  static final String MY_TAG= "RequestPropertyFragment";
    // TODO: Rename parameter arguments, choose names that match
    // the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
    private static final String ARG_PARAM1 = "param1";
    private static final String ARG_PARAM2 = "param2";

    // TODO: Rename and change types of parameters
    private String mParam1;
    private String mParam2;

    public RequestPropertyFragment() {
        // Required empty public constructor
    }

    /**
     * Use this factory method to create a new instance of
     * this fragment using the provided parameters.
     *
     * @param param1 Parameter 1.
     * @param param2 Parameter 2.
     * @return A new instance of fragment RequestPropertyFragment.
     */
    // TODO: Rename and change types and number of parameters
    public static RequestPropertyFragment newInstance(String param1, String param2) {
        RequestPropertyFragment fragment = new RequestPropertyFragment();
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
    RequestPropertyAdapter adapter;
    private List<RequestPropertyAttributes> data=new ArrayList<>();

    FragmentRequestPropertyBinding binding;
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fraggetment
        StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder().permitAll().build();

        StrictMode.setThreadPolicy(policy);
        binding=FragmentRequestPropertyBinding.inflate(inflater);
        adapter=new RequestPropertyAdapter();
        binding.AutoCompleteTextViewSelectStatus.setAdapter(new ArrayAdapter<>(getContext(), android.R.layout.simple_list_item_1,getActivity().getResources().getStringArray(R.array.status)));
        binding.btnAdd.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Toast.makeText(getContext(), "add", Toast.LENGTH_SHORT).show();
            }
        });
        binding.AutoCompleteTextViewSelectStatus.setOnTouchListener(new View.OnTouchListener() {
            @Override
            public boolean onTouch(View view, MotionEvent motionEvent) {
                binding.AutoCompleteTextViewSelectStatus.showDropDown();
                return false;
            }
        });
        binding.AutoCompleteTextViewSelectStatus.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {
                adapter.showFilter(getActivity().getResources().getStringArray(R.array.status)[i]);
            }
        });
        LinearLayoutManager linearLayoutManager=new LinearLayoutManager(getContext());
        binding.RecyclerView.setAdapter(adapter);
        DividerItemDecoration itemDecoration=new DividerItemDecoration(getContext(),DividerItemDecoration.VERTICAL);
        binding.RecyclerView.addItemDecoration(itemDecoration);
        binding.RecyclerView.setLayoutManager(linearLayoutManager);
        binding.btnAdd.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                showFormAdd(view.getContext());
            }
        });
        getData();
        return binding.getRoot();
    }

    public void setData(List<RequestPropertyAttributes> data) {
        this.data = data;
    }

    private void showFormAdd(Context mContext) {
        RequestPropertyVIewModel vIewModel = new RequestPropertyVIewModel();
        AddRequestDialogBinding binding = AddRequestDialogBinding.inflate(LayoutInflater.from(mContext));
        binding.setProperty(vIewModel);
        List<Attributes> groupPropertiesAtt = new ArrayList<>();
        List<String> types = Arrays.asList(mContext.getResources().getStringArray(R.array.requestType));
        ArrayAdapter<String> groupAdapter, typeAdapter;
        ArrayList<String> groupNames = new ArrayList<>();
        Call<DataListHasMetaResponse<DatumTemplate<Attributes>>> call = APIService.getService().getAllGroupProperties(Common.getToken());
        try {
            Response<DataListHasMetaResponse<DatumTemplate<Attributes>>> res = call.execute();
            if (res.isSuccessful()) {
                res.body().getData().forEach(item -> {
                    groupPropertiesAtt.add(item.getAttributes());
                    groupNames.add(item.getAttributes().getName());
                });
                groupAdapter = new ArrayAdapter<>(mContext, android.R.layout.simple_list_item_1, groupNames);
                typeAdapter = new ArrayAdapter<>(mContext, android.R.layout.simple_list_item_1, types);
                vIewModel.setAdapterType(typeAdapter);
                vIewModel.setAdapterGroup(groupAdapter);
            }
        } catch (IOException e) {


        }

        AlertDialog alertDialog = new AlertDialog.Builder(mContext).create();
        alertDialog.setIcon(R.drawable.add);
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
                vIewModel.setGroupProperty(String.valueOf(groupPropertiesAtt.get(i).getId()));
            }
        });
        binding.AutoCompleteTextViewType.setOnTouchListener(new View.OnTouchListener() {
            @Override
            public boolean onTouch(View view, MotionEvent motionEvent) {
                binding.AutoCompleteTextViewType.showDropDown();

                Log.d("'getCount", String.valueOf(binding.AutoCompleteTextViewGroup.getAdapter().getCount()));
                return false;
            }
        });
        binding.AutoCompleteTextViewType.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {
                vIewModel.setRequestType(String.valueOf(i));
            }
        });
        binding.txtSubmit.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                vIewModel.setSubmitted(true);
                if (vIewModel.check()) {
                    {
                        JSONObject dataParent = new JSONObject();
                        JSONObject dataChild = new JSONObject();
                        try {
                            dataChild.put("description", vIewModel.getDescription());
                            dataChild.put("group_property_id", vIewModel.getGroupProperty());
                            dataChild.put("reason", vIewModel.getReason());
                            dataChild.put("request_type", Integer.parseInt(vIewModel.getRequestType()));
                            dataChild.put("status", 0);
                            dataParent.put("request_property", dataChild);
                            RequestBody body = RequestBody.create(okhttp3.MediaType.parse("application/json; charset=utf-8"), dataParent.toString());
                            Call<JsonObject> call = APIService.getServiceJson().addRequestProperty(Common.getToken(), body);

                            Response res = null;

                            res = call.execute();
                            Gson gson = (new GsonBuilder()).setPrettyPrinting().create();
                            JsonParser parser = new JsonParser();
                            if (res.isSuccessful()) {

                                DatumTemplate<Department> d = new DatumTemplate<Department>();

                                JSONObject myResponse = new JSONObject(res.body().toString());
//                        DatumTemplate<Department> department=gson.fromJson(res.body().toString(),d.getClass());
                                JsonObject object = (JsonObject) parser.parse(res.body().toString());// response will be the json String
                                Log.d("eeeeeeeestr", res.body().toString());
                                DatumTemplate<RequestPropertyAttributes> emp = gson.fromJson(object.get("data"), new TypeToken<DatumTemplate<RequestPropertyAttributes>>() {
                                }.getType());
                                RequestPropertyAttributes department = emp.getAttributes();
                                data.add(department);
                                adapter.notifyItemInserted(data.size() - 1);
                                Log.d("eeeeeeee", emp.toString());
                                alertDialog.dismiss();
                                ((HomeActivity)getActivity()).showToast(true,"Create Request Property Success!");
                            } else {
                                Log.d("RETROFIT_ERROR :", String.valueOf(res.code()));
                                JSONObject jsonObject = null;
                                jsonObject = new JSONObject(res.errorBody().string());
                                JSONArray jsonArray = jsonObject.getJSONArray("errors");
                                Log.d("RETROFIT_ERROR_detail :", String.valueOf(jsonArray.getJSONObject(0).get("detail")));
                                //Toast.makeText(getContext(), String.valueOf(jsonArray.getJSONObject(0).get("detail")), Toast.LENGTH_SHORT).show();
                                ((HomeActivity)getActivity()).showToast(false,"Create Request Property Failed!");
                            }
                        } catch (JSONException e) {
                            ((HomeActivity)getActivity()).showToast(false,"Create Request Property Failed!");

                            throw new RuntimeException(e);
                        } catch (IOException e) {
                            ((HomeActivity)getActivity()).showToast(false,"Create Request Property Failed!");

                            throw new RuntimeException(e);
                        }

                    }
                }
                ;

            }
        });
        alertDialog.setView(binding.getRoot());
        alertDialog.show();
    }
    private void getData() {
        Call<DataListHasMetaResponse<DatumTemplate<RequestPropertyAttributes>>> call = APIService.getService().getAllPropertyRequest(Common.getToken());
        call.enqueue(new Callback<DataListHasMetaResponse<DatumTemplate<RequestPropertyAttributes>>>() {
            @Override
            public void onResponse(Call<DataListHasMetaResponse<DatumTemplate<RequestPropertyAttributes>>> call, Response<DataListHasMetaResponse<DatumTemplate<RequestPropertyAttributes>>> response) {
                if(response.isSuccessful()){
                    response.body().getData().forEach(item->{data.add(item.getAttributes());});
                    adapter.setData(data,getContext(), (HomeActivity) getActivity());
                }
            }

            @Override
            public void onFailure(Call<DataListHasMetaResponse<DatumTemplate<RequestPropertyAttributes>>> call, Throwable t) {

            }
        });
    }
}