package com.example.hrm;

import android.os.Bundle;

import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.example.hrm.Adapters.SeflPreviewAdpater;
import com.example.hrm.Response.DataResponseList;
import com.example.hrm.Response.DatumTemplate;
import com.example.hrm.Response.PerformanceAttributes;
import com.example.hrm.Services.APIService;
import com.example.hrm.databinding.InprogressSelfPreviewLayoutBinding;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

/**
 * A simple {@link Fragment} subclass.
 * Use the {@link SelfPreviewInProgressFragment#newInstance} factory method to
 * create an instance of this fragment.
 */
public class SelfPreviewInProgressFragment extends Fragment {

    // TODO: Rename parameter arguments, choose names that match
    // the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
    private static final String ARG_PARAM1 = "param1";
    private static final String ARG_PARAM2 = "param2";

    // TODO: Rename and change types of parameters
    private String mParam1;
    private String mParam2;

    public SelfPreviewInProgressFragment() {
        // Required empty public constructor
    }

    /**
     * Use this factory method to create a new instance of
     * this fragment using the provided parameters.
     *
     * @param param1 Parameter 1.
     * @param param2 Parameter 2.
     * @return A new instance of fragment SelfPreviewInProgressFragment.
     */
    // TODO: Rename and change types and number of parameters
    public static SelfPreviewInProgressFragment newInstance(String param1, String param2) {
        SelfPreviewInProgressFragment fragment = new SelfPreviewInProgressFragment();
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
    InprogressSelfPreviewLayoutBinding binding;
    SeflPreviewAdpater adpater;
    List<PerformanceAttributes> data=new ArrayList<>();
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        binding=InprogressSelfPreviewLayoutBinding.inflate(inflater);
        adpater=new SeflPreviewAdpater();
        LinearLayoutManager linearLayoutManager=new LinearLayoutManager(getContext());
        binding.rcvInProgress.setLayoutManager(linearLayoutManager);
        binding.rcvInProgress.setAdapter(adpater);
        getData();
        return binding.getRoot();
    }

    public void getData() {
        Call<DataResponseList<DatumTemplate<PerformanceAttributes>>> call = APIService.getService().getPaFormsByCurrentUser(Common.getToken());
        call.enqueue(new Callback<DataResponseList<DatumTemplate<PerformanceAttributes>>>() {
            @Override
            public void onResponse(Call<DataResponseList<DatumTemplate<PerformanceAttributes>>> call, Response<DataResponseList<DatumTemplate<PerformanceAttributes>>> response) {
                if(response.isSuccessful()){
                    response.body().getData().forEach(item->{data.add(item.getAttributes());});
                    adpater.setData(data, (HomeActivity) getActivity());
                }
            }

            @Override
            public void onFailure(Call<DataResponseList<DatumTemplate<PerformanceAttributes>>> call, Throwable t) {

            }
        });
    }


}