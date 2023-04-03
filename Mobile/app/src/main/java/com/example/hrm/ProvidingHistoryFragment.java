package com.example.hrm;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.DividerItemDecoration;
import androidx.recyclerview.widget.LinearLayoutManager;

import com.example.hrm.Adapters.ProvidingHistoryAdapter;
import com.example.hrm.Response.DataListHasMetaResponse;
import com.example.hrm.Response.DatumTemplate;
import com.example.hrm.Response.PropertyAttributes;
import com.example.hrm.Response.PropertyHistoryAttributes;
import com.example.hrm.Services.APIService;
import com.example.hrm.databinding.FragmentPropertyHistoryBinding;

import java.util.ArrayList;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

/**
 * A simple {@link Fragment} subclass.
 * Use the {@link ProvidingHistoryFragment#newInstance} factory method to
 * create an instance of this fragment.
 */
public class ProvidingHistoryFragment extends Fragment {
    public  static final String MY_TAG= "PropertyHistoryFragment";
    // TODO: Rename parameter arguments, choose names that match
    // the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
    private static final String ARG_PARAM1 = "param1";
    private static final String ARG_PARAM2 = "param2";

    // TODO: Rename and change types of parameters
    private String mParam1;
    private String mParam2;

    public ProvidingHistoryFragment() {
        // Required empty public constructor
    }
    private  PropertyAttributes att;
    public ProvidingHistoryFragment(PropertyAttributes att) {
        this.att=att;
    }

    /**
     * Use this factory method to create a new instance of
     * this fragment using the provided parameters.
     *
     * @param param1 Parameter 1.
     * @param param2 Parameter 2.
     * @return A new instance of fragment PropertyHistoryFragment.
     */
    // TODO: Rename and change types and number of parameters
    public static ProvidingHistoryFragment newInstance(String param1, String param2) {
        ProvidingHistoryFragment fragment = new ProvidingHistoryFragment();
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
    FragmentPropertyHistoryBinding binding;
    ArrayList<PropertyHistoryAttributes> data=new ArrayList<>();
    ProvidingHistoryAdapter providingHistoryAdapter;
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        binding=FragmentPropertyHistoryBinding.inflate(inflater);
        providingHistoryAdapter =new ProvidingHistoryAdapter(true);
        binding.RecyclerView.setAdapter(providingHistoryAdapter);
        LinearLayoutManager linearLayoutManager=new LinearLayoutManager(getContext());
        DividerItemDecoration dividerItemDecoration=new DividerItemDecoration(getContext(),DividerItemDecoration.VERTICAL);
        binding.RecyclerView.addItemDecoration(dividerItemDecoration);
        binding.RecyclerView.setLayoutManager(linearLayoutManager);
        //binding.columnAction.setVisibility(View.VISIBLE);
        getData();
        return binding.getRoot();
    }

    private void getData() {

//            data2.put("property_id",att.getId());
//            RequestBody body = RequestBody.create(okhttp3.MediaType.parse("application/json; charset=utf-8"), data2.toString());

            Call<DataListHasMetaResponse<DatumTemplate<PropertyHistoryAttributes>>> call = APIService.getService().getAllHistoryProviding(Common.getToken());
            call.enqueue(new Callback<DataListHasMetaResponse<DatumTemplate<PropertyHistoryAttributes>>>() {
            @Override
            public void onResponse(Call<DataListHasMetaResponse<DatumTemplate<PropertyHistoryAttributes>>> call, Response<DataListHasMetaResponse<DatumTemplate<PropertyHistoryAttributes>>> response) {
                if(response.isSuccessful()){
                    response.body().getData().forEach(item->{data.add(item.getAttributes());});
                    providingHistoryAdapter.setData(data,getContext(), (HomeActivity) getActivity());
                }
            }
            @Override
            public void onFailure(Call<DataListHasMetaResponse<DatumTemplate<PropertyHistoryAttributes>>> call, Throwable t) {

            }
        });



    }
}