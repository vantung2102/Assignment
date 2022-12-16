import React from "react";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import { PageWrapper } from "../../global/jsx/common";

import staffDetail from "./staffProfile.module.scss";
import { HiOutlineBars3 } from "react-icons/hi2";
import { TabBox, TabContent } from "./staffProfile";

import avatar from "../../assets/images/home/user.jpg";
import { Card, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Profile from "../../components/StaffProfile/Profile";

const StaffProfile = () => {
  const { id } = useParams();
  console.log(id);
  return (
    <div className="main-wrapper">
      <Header />
      <Sidebar />

      <PageWrapper>
        <Container fluid className="content">
          <Profile idProfile={id} />

          <TabBox className="card">
            <div className="row user-tabs">
              <div className="col-lg-12 col-md-12 col-sm-12 line-tabs">
                <ul className="nav nav-tabs nav-tabs-bottom">
                  <li className="nav-item">
                    <a
                      href="#emp_profile"
                      data-bs-toggle="tab"
                      className="nav-link active"
                    >
                      HR PROFILE
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="#emp_projects"
                      data-bs-toggle="tab"
                      className="nav-link"
                    >
                      TIME OFF
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="#bank_statutory"
                      data-bs-toggle="tab"
                      className="nav-link"
                    >
                      ONBOARDING
                    </a>
                  </li>

                  <li className="nav-item">
                    <a
                      href="#bank_statutory"
                      data-bs-toggle="tab"
                      className="nav-link"
                    >
                      PROJECT
                    </a>
                  </li>

                  <li className="nav-item">
                    <a
                      href="#bank_statutory"
                      data-bs-toggle="tab"
                      className="nav-link"
                    >
                      PERFORMANCE FROM
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </TabBox>

          <TabContent className="tab-content">
            <div className="tab-pane fade active show">
              <Card>
                <div className="card-body">
                  <h3 className="card-title"> Performance Form</h3>
                  <form action="#">
                    <div className="form-group row">
                      <label className="col-lg-12 col-form-label">
                        1. How did you do on the goals set for you during your
                        last performance appraisal?
                      </label>
                      <div className="col-lg-12">
                        <textarea
                          type="text"
                          rows="4"
                          cols="5"
                          className="form-control"
                        ></textarea>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-lg-12 col-form-label">
                        2. What was your biggest achievement this year?
                      </label>
                      <div className="col-lg-12">
                        <textarea
                          rows="4"
                          cols="5"
                          type="text"
                          className="form-control"
                        ></textarea>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-lg-12 col-form-label">
                        3. What are your short-and long-term goals with the
                        company, and for your career?
                      </label>
                      <div className="col-lg-12">
                        <textarea
                          rows="4"
                          cols="5"
                          type="email"
                          className="form-control"
                        ></textarea>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-lg-12 col-form-label">
                        4. What has been the most challenging aspect of your
                        work this past year and why?
                      </label>
                      <div className="col-lg-12">
                        <textarea
                          rows="4"
                          cols="5"
                          type="text"
                          className="form-control"
                        ></textarea>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-lg-12 col-form-label">
                        5. Which parts of your job do you most / least enjoy?
                      </label>
                      <div className="col-lg-12">
                        <textarea
                          rows="4"
                          cols="5"
                          type="text"
                          className="form-control"
                        ></textarea>
                      </div>
                    </div>

                    <div className="form-group row">
                      <label className="col-lg-12 col-form-label">
                        5. Which parts of your job do you most / least enjoy?
                      </label>
                      <div className="col-lg-12">
                        <textarea
                          rows="4"
                          cols="5"
                          type="text"
                          className="form-control"
                        ></textarea>
                      </div>
                    </div>

                    <div className="form-group row">
                      <label className="col-lg-12 col-form-label">
                        6. In what ways might you contribute more to the
                        company?
                      </label>
                      <div className="col-lg-12">
                        <textarea
                          rows="4"
                          cols="5"
                          type="text"
                          className="form-control"
                        ></textarea>
                      </div>
                    </div>

                    <div className="form-group row">
                      <label className="col-lg-12 col-form-label">
                        7. Do you feel that your current job and
                        responsibilities are aligned with your future goals?
                      </label>
                      <div className="col-lg-12">
                        <textarea
                          rows="4"
                          cols="5"
                          type="text"
                          className="form-control"
                        ></textarea>
                      </div>
                    </div>

                    <div className="form-group row">
                      <label className="col-lg-12 col-form-label">
                        8. Are you happy with the company’s culture? Do you feel
                        that there is any scope for improvement?
                      </label>
                      <div className="col-lg-12">
                        <textarea
                          rows="4"
                          cols="5"
                          type="text"
                          className="form-control"
                        ></textarea>
                      </div>
                    </div>

                    <div className="form-group row">
                      <label className="col-lg-12 col-form-label">
                        9. Is there anyone or anything that is obstructing your
                        performance in this company?
                      </label>
                      <div className="col-lg-12">
                        <textarea
                          rows="4"
                          cols="5"
                          type="text"
                          className="form-control"
                        ></textarea>
                      </div>
                    </div>

                    <div className="form-group row">
                      <label className="col-lg-12 col-form-label">
                        10. Do you feel that you receive adequate feedback? How
                        frequent feedback do you prefer
                      </label>
                      <div className="col-lg-12">
                        <textarea
                          rows="4"
                          cols="5"
                          type="text"
                          className="form-control"
                        ></textarea>
                      </div>
                    </div>

                    <div className="form-group row mb-3">
                      <label className="col-lg-12 col-form-label">Others</label>
                      <div className="col-lg-12">
                        <textarea
                          rows="4"
                          cols="5"
                          type="text"
                          className="form-control"
                        ></textarea>
                      </div>
                    </div>

                    <div className="text-end">
                      <button type="submit" className="btn btn-info">
                        Save
                      </button>
                      <button type="submit" className="btn btn-primary ms-5">
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </Card>
            </div>
          </TabContent>
        </Container>
      </PageWrapper>
    </div>
  );
};

export default StaffProfile;
