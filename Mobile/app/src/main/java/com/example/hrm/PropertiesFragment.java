package com.example.hrm;

import android.content.DialogInterface;
import android.os.Bundle;
import android.os.Handler;
import android.os.StrictMode;
import android.text.TextUtils;
import android.util.ArrayMap;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.RelativeLayout;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AlertDialog;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.ViewModelProvider;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.hrm.Adapters.PropertyAdpater;
import com.example.hrm.Response.Attributes;
import com.example.hrm.Response.DataListHasMetaResponse;
import com.example.hrm.Response.DatumStaff;
import com.example.hrm.Response.DatumTemplate;
import com.example.hrm.Response.Department;
import com.example.hrm.Response.PropertyAttributes;
import com.example.hrm.Services.APIService;
import com.example.hrm.ViewModel.PropertyShareViewModel;
import com.example.hrm.ViewModel.StaffShareViewModel;
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
import java.util.List;
import java.util.Map;

import okhttp3.RequestBody;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

/**
 * A simple {@link Fragment} subclass.
 * Use the {@link PropertiesFragment#newInstance} factory method to
 * create an instance of this fragment.
 */
public class PropertiesFragment extends Fragment {

    // TODO: Rename parameter arguments, choose names that match
    // the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
    private static final String ARG_PARAM1 = "param1";
    private static final String ARG_PARAM2 = "param2";
    public  static final String MY_TAG= "PropertiesFragment";
    // TODO: Rename and change types of parameters
    private String mParam1;
    private String mParam2;

    public PropertiesFragment() {
        // Required empty public constructor
    }

    /**
     * Use this factory method to create a new instance of
     * this fragment using the provided parameters.
     *
     * @param param1 Parameter 1.
     * @param param2 Parameter 2.
     * @return A new instance of fragment FirstFragment.
     */
    // TODO: Rename and change types and number of parameters
    public static PropertiesFragment newInstance(String param1, String param2) {
        PropertiesFragment fragment = new PropertiesFragment();
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
    private View mView;
    private RecyclerView rcvDes;
    private LinearLayout btn_add;
    List<PropertyAttributes> desDepartments=new ArrayList<>();
    PropertyAdpater departmentAdapter;
    int currentPage=1;
    boolean isLoading = false;
    int lastPage=1;
    RelativeLayout relativeMain;
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder().permitAll().build();

        StrictMode.setThreadPolicy(policy);
        mView=inflater.inflate(R.layout.fragment_properties, container, false);
        relativeMain=mView.findViewById(R.id.relativeMain);
        rcvDes=mView.findViewById(R.id.rcv_properties);
        btn_add=mView.findViewById(R.id.btn_add);
        departmentAdapter=new PropertyAdpater();
        LinearLayoutManager linearLayoutManager=new LinearLayoutManager(getContext());
        rcvDes.setAdapter(departmentAdapter);
        rcvDes.setLayoutManager(linearLayoutManager);
        getData();
        btn_add.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
//                Toast.makeText(getContext(), "btn_add", Toast.LENGTH_SHORT).show();
                    showFormAddDepartment();
            }
        });

        initScrollListener();
        return mView;
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        PropertyShareViewModel staffShareViewModel = new ViewModelProvider(getActivity()).get(PropertyShareViewModel.class);
        staffShareViewModel.getProperty().observe(getActivity(),property -> {
            if(property!=null&&desDepartments!=null&&desDepartments.size()!=0){
                desDepartments.set(property.getPositon(),property.getProperty());
                departmentAdapter.notifyItemChanged(property.getPositon());

            }


        });
        if(getArguments()!=null&&getArguments().getSerializable("propertyAtt")!=null){
            Log.d("propertyAtt", "!null");
            int pos=getArguments().getInt("pos");
            Log.d("pro_pos", String.valueOf(pos));
            PropertyAttributes propertyAttributes= (PropertyAttributes) getArguments().getSerializable("propertyAtt");
            departmentAdapter.setData(pos,propertyAttributes);
        } else Log.d("propertyAtt", "null");
    }

    public void addView(View toast){
        relativeMain.addView(toast);
        Handler handler=new Handler();
        handler.postDelayed(new Runnable() {
            @Override
            public void run() {
                relativeMain.removeView(relativeMain.findViewById(Integer.parseInt("06901")));
            }
        },2000);
    }
    private void initScrollListener() {
        rcvDes.addOnScrollListener(new RecyclerView.OnScrollListener() {
            @Override
            public void onScrollStateChanged(@NonNull RecyclerView recyclerView, int newState) {
                super.onScrollStateChanged(recyclerView, newState);
            }

            @Override
            public void onScrolled(@NonNull RecyclerView recyclerView, int dx, int dy) {
                super.onScrolled(recyclerView, dx, dy);

                LinearLayoutManager linearLayoutManager = (LinearLayoutManager) recyclerView.getLayoutManager();

                if (!isLoading) {
                    if (linearLayoutManager != null && linearLayoutManager.findLastCompletelyVisibleItemPosition() == desDepartments.size() - 1&& (currentPage<lastPage))  {
                        //bottom of list!
                        loadMore(currentPage+1);
                        currentPage+=1;
                        isLoading = true;
                    }
                }
            }
        });

    }
    private void loadMore(int pageNum) {
        Log.d("loadMore",String.valueOf(pageNum));
        desDepartments.add(null);
        departmentAdapter.notifyItemInserted(desDepartments.size() - 1);
        Call<DataListHasMetaResponse<DatumTemplate<PropertyAttributes>>> call= APIService.getService().getPropertiesByPageNum(Common.getToken(),pageNum);
        call.enqueue(new Callback<DataListHasMetaResponse<DatumTemplate<PropertyAttributes>>>() {
            @Override
            public void onResponse(Call<DataListHasMetaResponse<DatumTemplate<PropertyAttributes>>> call, Response<DataListHasMetaResponse<DatumTemplate<PropertyAttributes>>> response) {
                DataListHasMetaResponse res= response.body();
                Log.d("onResponse","onResponse szie"+res.getData().size());
                //
                desDepartments.remove(desDepartments.size() - 1);
                int scrollPosition = desDepartments.size();
                departmentAdapter.notifyItemRemoved(scrollPosition);
                //
                res.getData().forEach(item->{
                    DatumTemplate<PropertyAttributes> datumTemplate= (DatumTemplate<PropertyAttributes>) item;
                    PropertyAttributes s=datumTemplate.getAttributes();
                    //Log.d("StaffLeaveAttributes",s.toString());
                    desDepartments.add(s);
                });
                departmentAdapter.notifyDataSetChanged();
                isLoading = false;
            }

            @Override
            public void onFailure(Call<DataListHasMetaResponse<DatumTemplate<PropertyAttributes>>> call, Throwable t) {
                Log.d("onFailure",t.getMessage());
            }
        });
    }
    private void showFormAddDepartment() {
        departmentAdapter.showAddForm(getContext());
    }

    private void getData() {
        Call<DataListHasMetaResponse<DatumTemplate<PropertyAttributes>>> call=APIService.getService().getPropertiesByPageNum(Common.getToken(),1);
        call.enqueue(new Callback<DataListHasMetaResponse<DatumTemplate<PropertyAttributes>>>() {
            @Override
            public void onResponse(Call<DataListHasMetaResponse<DatumTemplate<PropertyAttributes>>> call, Response<DataListHasMetaResponse<DatumTemplate<PropertyAttributes>>> response) {
                Log.d("getData",response.toString());
                DataListHasMetaResponse res= response.body();
                //departmentAdapter.setData(response.body());
                Log.d("getData", String.valueOf(response.body().getData().size()));
                res.getData().forEach(item->{
                    DatumTemplate<PropertyAttributes> datumTemplate= (DatumTemplate<PropertyAttributes>) item;
                    PropertyAttributes s=datumTemplate.getAttributes();
                    //Log.d("StaffLeaveAttributes",s.toString());
                    desDepartments.add(s);
                });
                departmentAdapter.setData(desDepartments, (HomeActivity) getContext(),PropertiesFragment.this);
                lastPage=res.getMeta().getLastPage();
            }

            @Override
            public void onFailure(Call<DataListHasMetaResponse<DatumTemplate<PropertyAttributes>>> call, Throwable t) {
                Log.d("getData",t.getMessage());
            }
        });
    }
}