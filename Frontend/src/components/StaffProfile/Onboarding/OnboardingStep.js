import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOnboardingStep,
  onboardingStepSelector,
} from "../../../features/onboarding/onboardingSlice";

const OnboardingStep = () => {
  const dispatch = useDispatch();
  const onboardingStep = useSelector(onboardingStepSelector);

  useEffect(() => {
    dispatch(fetchOnboardingStep);
  }, []);
  return <div>OnboardingStep</div>;
};

export default OnboardingStep;
