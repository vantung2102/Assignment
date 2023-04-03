package com.example.hrm;

import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.DividerItemDecoration;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.os.Handler;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.example.hrm.Adapters.LeaveAdapter;
import com.example.hrm.Response.DataListHasMetaResponse;
import com.example.hrm.Response.DataStaffLeave;
import com.example.hrm.Response.DatumTemplate;
import com.example.hrm.Response.StaffLeaveAttributes;
import com.example.hrm.Services.APIService;
import com.example.hrm.databinding.FragmentLeaveBinding;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

/**
 * A simple {@link Fragment} subclass.
 * Use the {@link LeaveFragment#newInstance} factory method to
 * create an instance of this fragment.
 */
public class LeaveFragment extends Fragment implements BaseFragment{
    public  static final String MY_TAG= "LeaveFragment";
    // TODO: Rename parameter arguments, choose names that match
    // the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
    private static final String ARG_PARAM1 = "param1";
    private static final String ARG_PARAM2 = "param2";

    // TODO: Rename and change types of parameters
    private String mParam1;
    private String mParam2;

    public LeaveFragment() {
        // Required empty public constructor
    }

    /**
     * Use this factory method to create a new instance of
     * this fragment using the provided parameters.
     *
     * @param param1 Parameter 1.
     * @param param2 Parameter 2.
     * @return A new instance of fragment LeaveFragment.
     */
    // TODO: Rename and change types and number of parameters
    public static LeaveFragment newInstance(String param1, String param2) {
        LeaveFragment fragment = new LeaveFragment();
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
        getData();
    }
    List<StaffLeaveAttributes> data=new ArrayList<>();
    private void getData() {
        Call<DataListHasMetaResponse<DatumTemplate<StaffLeaveAttributes>>> call= APIService.getService().getLeaveByPageNum(Common.getToken(),1);
        call.enqueue(new Callback<DataListHasMetaResponse<DatumTemplate<StaffLeaveAttributes>>>() {
            @Override
            public void onResponse(Call<DataListHasMetaResponse<DatumTemplate<StaffLeaveAttributes>>> call, Response<DataListHasMetaResponse<DatumTemplate<StaffLeaveAttributes>>> response) {

                DataListHasMetaResponse res= response.body();
                Log.d("onResponse","onResponse szie"+res.getData().size());
                res.getData().forEach(item->{
                    DatumTemplate<StaffLeaveAttributes> datumTemplate= (DatumTemplate<StaffLeaveAttributes>) item;
                    StaffLeaveAttributes s=new StaffLeaveAttributes(datumTemplate.getAttributes());
                    //Log.d("StaffLeaveAttributes",s.toString());
                    data.add(s);
                });
                leaveAdapter.setData(data, (HomeActivity) getActivity());
                //total page
                lastPage=res.getMeta().getLastPage();
            }

            @Override
            public void onFailure(Call<DataListHasMetaResponse<DatumTemplate<StaffLeaveAttributes>>> call, Throwable t) {
                Log.d("onFailure",t.getMessage());
            }
        });
    }

    FragmentLeaveBinding fragmentLeaveBinding;
    LeaveAdapter leaveAdapter;
    int currentPage=1;
    boolean isLoading = false;
    int lastPage=1;
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        fragmentLeaveBinding=FragmentLeaveBinding.inflate(inflater);
        leaveAdapter=new LeaveAdapter();
        DividerItemDecoration dividerItemDecoration=new DividerItemDecoration(getContext(),DividerItemDecoration.VERTICAL);
        fragmentLeaveBinding.rcvLeave.setAdapter(leaveAdapter);
        leaveAdapter.setData(data, (HomeActivity) getActivity());
        LinearLayoutManager linearLayoutManager=new LinearLayoutManager(getContext());
        fragmentLeaveBinding.rcvLeave.setLayoutManager(linearLayoutManager);
        fragmentLeaveBinding.rcvLeave.addItemDecoration(dividerItemDecoration);
        initScrollListener();
        return fragmentLeaveBinding.getRoot();
    }

    private void initScrollListener() {
        fragmentLeaveBinding.rcvLeave.addOnScrollListener(new RecyclerView.OnScrollListener() {
            @Override
            public void onScrollStateChanged(@NonNull RecyclerView recyclerView, int newState) {
                super.onScrollStateChanged(recyclerView, newState);
            }

            @Override
            public void onScrolled(@NonNull RecyclerView recyclerView, int dx, int dy) {
                super.onScrolled(recyclerView, dx, dy);

                LinearLayoutManager linearLayoutManager = (LinearLayoutManager) recyclerView.getLayoutManager();

                if (!isLoading) {
                    if (linearLayoutManager != null && linearLayoutManager.findLastCompletelyVisibleItemPosition() == data.size() - 1&& (currentPage<lastPage))  {
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
        data.add(null);
        leaveAdapter.notifyItemInserted(data.size() - 1);
        Call<DataListHasMetaResponse<DatumTemplate<StaffLeaveAttributes>>> call= APIService.getService().getLeaveByPageNum(Common.getToken(),pageNum);
        call.enqueue(new Callback<DataListHasMetaResponse<DatumTemplate<StaffLeaveAttributes>>>() {
            @Override
            public void onResponse(Call<DataListHasMetaResponse<DatumTemplate<StaffLeaveAttributes>>> call, Response<DataListHasMetaResponse<DatumTemplate<StaffLeaveAttributes>>> response) {
                DataListHasMetaResponse res= response.body();
                Log.d("onResponse","onResponse szie"+res.getData().size());
                //
                data.remove(data.size() - 1);
                int scrollPosition = data.size();
                leaveAdapter.notifyItemRemoved(scrollPosition);
                //
                res.getData().forEach(item->{
                    DatumTemplate<StaffLeaveAttributes> datumTemplate= (DatumTemplate<StaffLeaveAttributes>) item;
                    StaffLeaveAttributes s=new StaffLeaveAttributes(datumTemplate.getAttributes());
                    //Log.d("StaffLeaveAttributes",s.toString());
                    data.add(s);
                });
                leaveAdapter.notifyDataSetChanged();
                isLoading = false;
            }

            @Override
            public void onFailure(Call<DataListHasMetaResponse<DatumTemplate<StaffLeaveAttributes>>> call, Throwable t) {
                Log.d("onFailure",t.getMessage());
            }
        });
    }

    @Override
    public String getTAG() {
        return MY_TAG;
    }
}