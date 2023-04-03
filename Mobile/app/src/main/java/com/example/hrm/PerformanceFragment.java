package com.example.hrm;

import android.os.Bundle;

import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.DividerItemDecoration;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.example.hrm.Adapters.PerformanceAdpater;
import com.example.hrm.Response.DataResponseList;
import com.example.hrm.Response.DatumTemplate;
import com.example.hrm.Response.PerformanceAttributes;
import com.example.hrm.Services.APIService;
import com.example.hrm.databinding.FragmentPerformanceBinding;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

/**
 * A simple {@link Fragment} subclass.
 * Use the {@link PerformanceFragment#newInstance} factory method to
 * create an instance of this fragment.
 */
public class PerformanceFragment extends Fragment {
    public  static final String MY_TAG= "PerformanceFragment";
    // TODO: Rename parameter arguments, choose names that match
    // the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
    private static final String ARG_PARAM1 = "param1";
    private static final String ARG_PARAM2 = "param2";

    // TODO: Rename and change types of parameters
    private String mParam1;
    private String mParam2;

    public PerformanceFragment() {
        // Required empty public constructor
    }

    /**
     * Use this factory method to create a new instance of
     * this fragment using the provided parameters.
     *
     * @param param1 Parameter 1.
     * @param param2 Parameter 2.
     * @return A new instance of fragment PerformanceFragment.
     */
    // TODO: Rename and change types and number of parameters
    public static PerformanceFragment newInstance(String param1, String param2) {
        PerformanceFragment fragment = new PerformanceFragment();
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
    private List<PerformanceAttributes> data=new ArrayList<>();
    FragmentPerformanceBinding binding;
    private PerformanceAdpater adpater;
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        binding=FragmentPerformanceBinding.inflate(inflater);
        adpater=new PerformanceAdpater();
        LinearLayoutManager linearLayoutManager=new LinearLayoutManager(getContext());
        binding.rcvStaff.setLayoutManager(linearLayoutManager);
        binding.rcvStaff.setAdapter(adpater);
        DividerItemDecoration dividerItemDecoration = new DividerItemDecoration(getContext(),
                DividerItemDecoration.VERTICAL);
        binding.rcvStaff.addItemDecoration(dividerItemDecoration);
        getData();
        return binding.getRoot();
    }

    private void getData() {
        Call<DataResponseList<DatumTemplate<PerformanceAttributes>>> call = APIService.getService().getAllPerformanceAppraisalForms(Common.getToken());
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