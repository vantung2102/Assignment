package com.example.hrm;

import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.fragment.app.Fragment;

import com.example.hrm.Response.DataResponse;
import com.example.hrm.Response.DatumTemplate;
import com.example.hrm.Response.LeaveApplicationAttributes;
import com.example.hrm.Response.RequestPropertyAttributes;
import com.example.hrm.Response.Staff;
import com.example.hrm.Services.APIService;
import com.example.hrm.databinding.FragmentDetailLeaveApplicationBinding;
import com.example.hrm.databinding.FragmentDetailPropertyHistoryProvidingBinding;
import com.example.hrm.databinding.FragmentDetailRequestPropertyBinding;

import org.json.JSONException;
import org.json.JSONObject;

import okhttp3.RequestBody;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

/**
 * A simple {@link Fragment} subclass.
 * Use the {@link DetailRequestPropertyFragment#newInstance} factory method to
 * create an instance of this fragment.
 */
public class DetailRequestPropertyFragment extends Fragment {
    public  static final String MY_TAG= "DetailRequestPropertyFragment";
    // TODO: Rename parameter arguments, choose names that match
    // the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
    private static final String ARG_PARAM1 = "param1";
    private static final String ARG_PARAM2 = "param2";

    // TODO: Rename and change types of parameters
    private String mParam1;
    private String mParam2;

    public DetailRequestPropertyFragment() {
        // Required empty public constructor
    }
    private RequestPropertyAttributes att;
    private String type;
    public DetailRequestPropertyFragment(RequestPropertyAttributes att) {

        this.att=att;
    }

    /**
     * Use this factory method to create a new instance of
     * this fragment using the provided parameters.
     *
     * @param param1 Parameter 1.
     * @param param2 Parameter 2.
     * @return A new instance of fragment DetailLeaveApplicationFragment.
     */
    // TODO: Rename and change types and number of parameters
    public static DetailRequestPropertyFragment newInstance(String param1, String param2) {
        DetailRequestPropertyFragment fragment = new DetailRequestPropertyFragment();
        Bundle args = new Bundle();
        args.putString(ARG_PARAM1, param1);
        args.putString(ARG_PARAM2, param2);
        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if(getArguments()!=null){
            this.type=getArguments().getString("TYPE",Common.STATUS_PENDING);
            Log.d("type",type);
        }
    }
    FragmentDetailRequestPropertyBinding binding;
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        binding=FragmentDetailRequestPropertyBinding.inflate(inflater);
        binding.txtReason.setText(att.getReason());
        binding.txtRequester.setText(att.getRequester()!=null?att.getRequester().getFullname():" ");

        binding.txtType.setText(att.getRequestType());
        binding.txtDetail.setText(att.getDescription());
        binding.btnApprove.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                responseRequest(true);
            }
        });
        binding.btnCancle.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                responseRequest(false);
            }
        });
        updateButton();
        return binding.getRoot();
    }

    private void updateButton() {
        Staff staff= (Staff) att.getApprover();
        binding.txtApprover.setText(att.getApprover()==null?" ": staff.getFullname());
        if(att.getStatus().equals(Common.STATUS_APPROVED)){
            binding.txtStatus.setText(Common.STATUS_APPROVED);
            binding.btnCancle.setVisibility(View.GONE);
            binding.btnApprove.setVisibility(View.GONE);
            binding.txtStatus.setBackground(getActivity().getDrawable(R.drawable.layout_rounded_border_green));
            binding.txtStatus.setTextColor(getActivity().getColor(R.color.toast_success));
        }
        else if(att.getStatus().equals(Common.STATUS_CANCLED)){
            binding.txtStatus.setBackground(getActivity().getDrawable(R.drawable.layout_rounded_border_red));
            binding.txtStatus.setTextColor(getActivity().getColor(R.color.toast_failed));
            binding.txtStatus.setText(Common.STATUS_CANCLED);
            binding.btnCancle.setVisibility(View.GONE);
            binding.btnApprove.setVisibility(View.GONE);
        } else {
            binding.txtStatus.setBackground(getActivity().getDrawable(R.drawable.layout_rounded_border_yellow));
            binding.txtStatus.setTextColor(getActivity().getColor(R.color.pending));
        }

    }

    private void responseRequest(boolean b) {
        JSONObject parent=new JSONObject();
        try {
            parent.put("response_type",b?Common.STATUS_APPROVED:Common.STATUS_CANCLED);
            RequestBody body = RequestBody.create(okhttp3.MediaType.parse("application/json; charset=utf-8"), parent.toString());
            Call<DataResponse<DatumTemplate<RequestPropertyAttributes>>> call= APIService.getService().respond_to_request_property(att.getId(),Common.getToken(),body);
            call.enqueue(new Callback<DataResponse<DatumTemplate<RequestPropertyAttributes>>>() {
                @Override
                public void onResponse(Call<DataResponse<DatumTemplate<RequestPropertyAttributes>>> call, Response<DataResponse<DatumTemplate<RequestPropertyAttributes>>> response) {
                    if(response.isSuccessful()){
                        Log.d("response","approved");
                        if(response.body().getData().getAttributes().getStatus().equals(Common.STATUS_APPROVED)){
                            Log.d("doSome","STATUS_APPROVED");

                        } else if(response.body().getData().getAttributes().getStatus().equals(Common.STATUS_CANCLED)){
                            Log.d("doSome","STATUS_CANCLED");
                        }
                        att=response.body().getData().getAttributes();
                        updateButton();
                    } else {
                        Log.d("response", String.valueOf(response.code()));
                    }
                }

                @Override
                public void onFailure(Call<DataResponse<DatumTemplate<RequestPropertyAttributes>>> call, Throwable t) {
                    Log.d("response", t.getMessage());
                }
            });
        } catch (JSONException e) {
            throw new RuntimeException(e);
        }
    }
    public interface IDoStuff{
        void doSome();
    }



}