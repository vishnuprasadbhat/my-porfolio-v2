"use client";
import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Cursor from "@/components/Cursor";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
import { updateLocalFile, updatePortfolio } from "../actions";
import { useActionState } from "react";
import Toaster from "@/components/Toaster";
import { toast } from "react-toastify";
import Button from "@/components/Button";

const initialState = { msg: "", status: "" };

const EditData = ({ myData, id }) => {
  const [data, setData] = useState(myData);
  const [currentTabs, setCurrentTabs] = useState("HEADER");
  const [updateStatus, formAction] = useActionState(
    updatePortfolio,
    initialState,
  );

  useEffect(() => {
    if (updateStatus?.msg) {
      if (updateStatus?.status === "success") {
        toast.success(updateStatus?.msg);
      } else {
        toast.error(updateStatus?.msg);
      }
    }
    console.log(updateStatus?.msg, updateStatus?.status);
  }, [updateStatus?.msg, updateStatus?.status]);

  const saveData = async () => {
    if (process.env.NODE_ENV === "development") {
      updateLocalFile(data);
    }
  };

  // Project Handler
  const editProjects = (projectIndex, editProject) => {
    const copyProjects = [...data.projects];
    copyProjects[projectIndex] = { ...editProject };
    setData({ ...data, projects: copyProjects });
  };

  const addProject = () => {
    setData({
      ...data,
      projects: [
        ...data.projects,
        {
          id: uuidv4(),
          title: "New Project",
          description: "Web Design & Development",
          imageSrc: "",
          url: "",
        },
      ],
    });
  };

  const deleteProject = (id) => {
    let copyProjects = data.projects;
    copyProjects = copyProjects.filter((project) => project.id !== id);
    setData({ ...data, projects: copyProjects });
  };

  // Services Handler

  const editServices = (serviceIndex, editService) => {
    const copyServices = [...data.services];
    copyServices[serviceIndex] = { ...editService };
    setData({ ...data, services: copyServices });
  };

  const addService = () => {
    setData({
      ...data,
      services: [
        ...data.services,
        {
          id: uuidv4(),
          title: "New Service",
          description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
        },
      ],
    });
  };

  const deleteService = (id) => {
    let copyServices = data.services;
    copyServices = copyServices.filter((service) => service.id !== id);
    setData({ ...data, services: copyServices });
  };

  // Tech Stack Handler

  const editTechStack = (techStackIndex, editTechStack) => {
    const copyTechStacks = [...data.techStacks];
    copyTechStacks[techStackIndex] = { ...editTechStack };
    setData({ ...data, techStacks: copyTechStacks });
  };

  const addTechStack = () => {
    setData({
      ...data,
      techStacks: [
        ...data.techStacks,
        {
          id: uuidv4(),
          title: "New Tech Stacks",
          icon: "reactjs",
        },
      ],
    });
  };

  const deleteTechStack = (id) => {
    const copyTechStacks = data.techStacks.filter(
      (techStack) => techStack.id !== id,
    );
    setData({ ...data, techStacks: copyTechStacks });
  };

  // Socials Handler

  const editSocials = (socialIndex, editSocial) => {
    const copySocials = [...data.socials];
    copySocials[socialIndex] = { ...editSocial };
    setData({ ...data, socials: copySocials });
  };

  const addSocials = () => {
    setData({
      ...data,
      socials: [
        ...data.socials,
        {
          id: uuidv4(),
          title: "New Link",
          link: "",
        },
      ],
    });
  };

  const deleteSocials = (id) => {
    const copySocials = data.socials.filter((social) => social.id !== id);
    setData({ ...data, socials: copySocials });
  };

  // Resume

  const handleAddExperiences = () => {
    setData({
      ...data,
      resume: {
        ...data.resume,
        experiences: [
          ...data.resume.experiences,
          {
            id: uuidv4(),
            dates: "Enter Dates",
            type: "Full Time",
            position: "Frontend Engineer at X",
            bullets: ["Worked on the frontend of a React application"],
          },
        ],
      },
    });
  };

  const handleEditExperiences = (index, editExperience) => {
    const copyExperiences = [...data.resume.experiences];
    copyExperiences[index] = { ...editExperience };
    setData({
      ...data,
      resume: { ...data.resume, experiences: copyExperiences },
    });
  };

  return (
    <div
      className={`mb-5 container mx-auto ${data.showCursor && "cursor-none"}`}
    >
      <Toaster />
      <Header data={myData} isBlog isEdit></Header>
      {data.showCursor && (
        <div className="hidden tablet:flex">
          <Cursor />
        </div>
      )}
      <form className="px-2 laptop:px-0" action={formAction}>
        <input type="hidden" name="id" value={id} />
        <input type="hidden" name="myData" value={JSON.stringify(data)} />
        <div className="mt-5">
          <div>
            <div className="flex items-center justify-between">
              <h1 className="text-2xl">Dashboard</h1>
              <div className="flex items-center">
                <Button onClick={saveData} isForm type="primary">
                  Save
                </Button>
              </div>
            </div>

            <div className="flex items-center flex-wrap mt-4">
              <Button
                onClick={() => setCurrentTabs("HEADER")}
                type={currentTabs === "HEADER" && "primary"}
              >
                Header
              </Button>
              <Button
                onClick={() => setCurrentTabs("PROJECTS")}
                type={currentTabs === "PROJECTS" && "primary"}
              >
                Projects
              </Button>
              <Button
                onClick={() => setCurrentTabs("SERVICES")}
                type={currentTabs === "SERVICES" && "primary"}
              >
                Services
              </Button>
              <Button
                onClick={() => setCurrentTabs("TECHSTACK")}
                type={currentTabs === "TECHSTACK" && "primary"}
              >
                Tech Stack
              </Button>
              <Button
                onClick={() => setCurrentTabs("ABOUT")}
                type={currentTabs === "ABOUT" && "primary"}
              >
                About
              </Button>
              <Button
                onClick={() => setCurrentTabs("SOCIAL")}
                type={currentTabs === "SOCIAL" && "primary"}
              >
                Social
              </Button>
              <Button
                onClick={() => setCurrentTabs("RESUME")}
                type={currentTabs === "RESUME" && "primary"}
              >
                Resume
              </Button>
              <Button
                onClick={() => setCurrentTabs("CONTACT")}
                type={currentTabs === "CONTACT" && "primary"}
              >
                Contact
              </Button>
            </div>
          </div>
          <div className="px-2 laptop:px-0">
            {/* HEADER */}
            {currentTabs === "HEADER" && (
              <div className="mt-10">
                <div className="flex items-center">
                  <label className="w-2/6 mr-5 text-lg opacity-50">Name</label>
                  <input
                    value={data.name}
                    onChange={(e) => setData({ ...data, name: e.target.value })}
                    className="w-full mr-auto p-2 rounded-md shadow-lg border-2"
                    type="text"
                  ></input>
                </div>
                <div className="mt-5 flex items-center">
                  <label className="w-2/6 mr-5 text-sx opacity-50">
                    Header Tagline One
                  </label>
                  <input
                    value={data.headerTaglineOne}
                    onChange={(e) =>
                      setData({ ...data, headerTaglineOne: e.target.value })
                    }
                    className="w-full mr-auto p-2 rounded-md shadow-lg border-2"
                    type="text"
                  ></input>
                </div>
                <div className="mt-5 flex items-center">
                  <label className="w-2/6 mr-5 text-lg opacity-50">
                    Header Tagline Two
                  </label>
                  <input
                    value={data.headerTaglineTwo}
                    onChange={(e) =>
                      setData({ ...data, headerTaglineTwo: e.target.value })
                    }
                    className="w-full mr-auto p-2 rounded-md shadow-lg border-2"
                    type="text"
                  ></input>
                </div>
                <div className="mt-5 flex items-center">
                  <label className="w-2/6 mr-5 text-lg opacity-50">
                    Header Tagline Three
                  </label>
                  <input
                    value={data.headerTaglineThree}
                    onChange={(e) =>
                      setData({ ...data, headerTaglineThree: e.target.value })
                    }
                    className="w-full mr-auto p-2 rounded-md shadow-lg border-2"
                    type="text"
                  ></input>
                </div>
                <div className="mt-5 flex items-center">
                  <label className="w-2/6 mr-5 text-lg opacity-50">
                    Header Tagline Four
                  </label>
                  <input
                    value={data.headerTaglineFour}
                    onChange={(e) =>
                      setData({ ...data, headerTaglineFour: e.target.value })
                    }
                    className="w-full mr-auto p-2 rounded-md shadow-lg border-2"
                    type="text"
                  ></input>
                </div>
                <div className="mt-5 flex items-center">
                  <label className="w-2/6 mr-5 text-lg opacity-50">Blog</label>
                  <div className="w-full mr-auto flex items-center">
                    <Button
                      onClick={() => setData({ ...data, showBlog: true })}
                      type={data.showBlog && "primary"}
                    >
                      Yes
                    </Button>
                    <Button
                      onClick={() => setData({ ...data, showBlog: false })}
                      classes={
                        !data.showBlog &&
                        "bg-red-500 text-white hover:bg-red-600"
                      }
                    >
                      No
                    </Button>
                  </div>
                </div>
                <div className="mt-5 flex items-center">
                  <label className="w-2/6 mr-5 text-lg opacity-50">
                    Services
                  </label>
                  <div className="w-full mr-auto flex items-center">
                    <Button
                      onClick={() => setData({ ...data, showServices: true })}
                      type={data.showServices && "primary"}
                    >
                      Yes
                    </Button>
                    <Button
                      onClick={() => setData({ ...data, showServices: false })}
                      classes={
                        !data.showServices &&
                        "bg-red-500 text-white hover:bg-red-600"
                      }
                    >
                      No
                    </Button>
                  </div>
                </div>
                <div className="mt-5 flex items-center">
                  <label className="w-2/6 mr-5 text-lg opacity-50">
                    Dark Mode
                  </label>
                  <div className="w-full mr-auto flex items-center">
                    <Button
                      onClick={() => setData({ ...data, darkMode: true })}
                      type={data.darkMode && "primary"}
                    >
                      Yes
                    </Button>
                    <Button
                      onClick={() => setData({ ...data, darkMode: false })}
                      classes={
                        !data.darkMode &&
                        "bg-red-500 text-white hover:bg-red-600"
                      }
                    >
                      No
                    </Button>
                  </div>
                </div>
                <div className="mt-5 flex items-center">
                  <label className="w-2/6 mr-5 text-lg opacity-50">
                    Show Resume
                  </label>
                  <div className="w-full mr-auto flex items-center">
                    <Button
                      onClick={() => setData({ ...data, showResume: true })}
                      type={data.showResume && "primary"}
                    >
                      Yes
                    </Button>
                    <Button
                      onClick={() => setData({ ...data, showResume: false })}
                      classes={
                        !data.showResume &&
                        "bg-red-500 text-white hover:bg-red-600"
                      }
                    >
                      No
                    </Button>
                  </div>
                </div>
                <div className="mt-5 flex items-center">
                  <label className="w-2/6 mr-5 text-lg opacity-50">
                    Show Resume as PDF
                  </label>
                  <div className="w-full mr-auto flex items-center">
                    <Button
                      onClick={() => setData({ ...data, isResumePDF: true })}
                      type={data.isResumePDF && "primary"}
                    >
                      Yes
                    </Button>
                    <Button
                      onClick={() => setData({ ...data, isResumePDF: false })}
                      classes={
                        !data.isResumePDF &&
                        "bg-red-500 text-white hover:bg-red-600"
                      }
                    >
                      No
                    </Button>
                  </div>
                </div>
                <div className="mt-5 flex items-center">
                  <label className="w-2/6 mr-5 text-lg opacity-50">
                    Resume Link
                  </label>
                  <input
                    value={data.resumeLink}
                    onChange={(e) =>
                      setData({ ...data, resumeLink: e.target.value })
                    }
                    className="w-full mr-auto p-2 rounded-md shadow-lg border-2"
                    type="text"
                  ></input>
                </div>
                <div className="mt-5 flex items-center">
                  <label className="w-2/6 mr-5 text-lg opacity-50">
                    Custom Cursor
                  </label>
                  <div className="w-full mr-auto flex items-center">
                    <Button
                      onClick={() => setData({ ...data, showCursor: true })}
                      type={data.showCursor && "primary"}
                    >
                      Yes
                    </Button>
                    <Button
                      onClick={() => setData({ ...data, showCursor: false })}
                      classes={
                        !data.showCursor &&
                        "bg-red-500 text-white hover:bg-red-600"
                      }
                    >
                      No
                    </Button>
                  </div>
                </div>
              </div>
            )}
            {/* PROJECTS */}
            {currentTabs === "PROJECTS" && (
              <>
                <div className="mt-10">
                  {data.projects.map((project, index) => (
                    <div className="mt-10" key={project.id}>
                      <div className="flex items-center justify-between">
                        <h1 className="text-2xl">{project.title}</h1>
                        <Button
                          onClick={() => deleteProject(project.id)}
                          type="primary"
                        >
                          Delete
                        </Button>
                      </div>

                      <div className="flex items-center mt-5">
                        <label className="w-2/6 mr-5 text-lg opacity-50">
                          Title
                        </label>
                        <input
                          value={project.title}
                          onChange={(e) =>
                            editProjects(index, {
                              ...project,
                              title: e.target.value,
                            })
                          }
                          className="w-full mr-auto p-2 rounded-md shadow-lg border-2"
                          type="text"
                        ></input>
                      </div>
                      <div className="flex items-center mt-2">
                        <label className="w-2/6 mr-5 text-lg opacity-50">
                          Description
                        </label>
                        <input
                          value={project.description}
                          onChange={(e) =>
                            editProjects(index, {
                              ...project,
                              description: e.target.value,
                            })
                          }
                          className="w-full mr-auto p-2 rounded-md shadow-lg border-2"
                          type="text"
                        ></input>
                      </div>
                      <div className="flex items-center mt-2">
                        <label className="w-2/6 mr-5 text-lg opacity-50">
                          Image Source
                        </label>
                        <input
                          value={project.imageSrc}
                          onChange={(e) =>
                            editProjects(index, {
                              ...project,
                              imageSrc: e.target.value,
                            })
                          }
                          className="w-full mr-auto p-2 rounded-md shadow-lg border-2"
                          type="text"
                        ></input>
                      </div>
                      <div className="flex items-center mt-2">
                        <label className="w-2/6 mr-5 text-lg opacity-50">
                          url
                        </label>
                        <input
                          value={project.url}
                          onChange={(e) =>
                            editProjects(index, {
                              ...project,
                              url: e.target.value,
                            })
                          }
                          className="w-full mr-auto p-2 rounded-md shadow-lg border-2"
                          type="text"
                        ></input>
                      </div>
                      <hr className="my-10"></hr>
                    </div>
                  ))}
                </div>

                <div className="my-10">
                  <Button onClick={addProject} type="primary">
                    Add Project +
                  </Button>
                </div>
              </>
            )}
            {/* SERVICES */}
            {currentTabs === "SERVICES" && (
              <>
                <div className="mt-10">
                  {data.services.map((service, index) => (
                    <div key={service.id}>
                      <div className="flex items-center justify-between">
                        <h1 className="text-2xl">{service.title}</h1>
                        <Button
                          onClick={() => deleteService(service.id)}
                          type="primary"
                        >
                          Delete
                        </Button>
                      </div>
                      <div className="flex items-center mt-5">
                        <label className="w-2/6 mr-5 text-lg opacity-50">
                          Title
                        </label>
                        <input
                          value={service.title}
                          onChange={(e) =>
                            editServices(index, {
                              ...service,
                              title: e.target.value,
                            })
                          }
                          className="w-full mr-auto p-2 rounded-md shadow-lg border-2"
                          type="text"
                        ></input>
                      </div>
                      <div className="flex items-center mt-5">
                        <label className="w-2/6 mr-5 text-lg opacity-50">
                          Description
                        </label>
                        <textarea
                          value={service.description}
                          onChange={(e) =>
                            editServices(index, {
                              ...service,
                              description: e.target.value,
                            })
                          }
                          className="w-full mr-auto p-2 rounded-md shadow-lg border-2"
                        ></textarea>
                      </div>
                      <hr className="my-10"></hr>
                    </div>
                  ))}
                </div>
                <div className="my-10">
                  <Button onClick={addService} type="primary">
                    Add Service +
                  </Button>
                </div>
              </>
            )}
            {currentTabs === "TECHSTACK" && (
              <>
                <div className="mt-10">
                  {data.techStacks.map((techStack, index) => (
                    <div key={techStack.id}>
                      <div className="flex items-center justify-between">
                        <h1 className="text-2xl">{techStack.title}</h1>
                        <Button
                          onClick={() => deleteTechStack(techStack.id)}
                          type="primary"
                        >
                          Delete
                        </Button>
                      </div>
                      <div className="flex items-center mt-5">
                        <label className="w-2/6 mr-5 text-lg opacity-50">
                          Title
                        </label>
                        <input
                          value={techStack.title}
                          onChange={(e) =>
                            editTechStack(index, {
                              ...techStack,
                              title: e.target.value,
                            })
                          }
                          className="w-full mr-auto p-2 rounded-md shadow-lg border-2"
                          type="text"
                        ></input>
                      </div>
                      <div className="flex items-center mt-5">
                        <label className="w-2/6 mr-5 text-lg opacity-50">
                          Icon
                        </label>
                        <div className="flex flex-col w-full mr-auto">
                          <input
                            value={techStack.icon}
                            onChange={(e) =>
                              editTechStack(index, {
                                ...techStack,
                                icon: e.target.value,
                              })
                            }
                            className="p-2 rounded-md shadow-lg border-2"
                            type="text"
                          ></input>
                          <Link
                            href="https://www.tech-stack-icons.com/"
                            className="mt-2 underline underline-offset-1"
                            target="_blank"
                          >
                            Get Icon Names here
                          </Link>
                        </div>
                      </div>
                      <hr className="my-10"></hr>
                    </div>
                  ))}
                </div>
                <div className="my-10">
                  <Button onClick={addTechStack} type="primary">
                    Add Tech Stack +
                  </Button>
                </div>
              </>
            )}
            {currentTabs === "ABOUT" && (
              <div className="mt-10">
                <h1 className="text-2xl">About</h1>
                <textarea
                  className="w-full h-96 mt-10 p-2 rounded-md shadow-md border"
                  value={data.aboutpara}
                  onChange={(e) =>
                    setData({ ...data, aboutpara: e.target.value })
                  }
                ></textarea>
              </div>
            )}
            {currentTabs === "SOCIAL" && (
              <div className="mt-10">
                {data.socials.map((social, index) => (
                  <div key={social.id}>
                    <div className="flex items-center justify-between">
                      <h1 className="text-2xl">{social.title}</h1>
                      <Button
                        onClick={() => deleteSocials(social.id)}
                        type="primary"
                      >
                        Delete
                      </Button>
                    </div>
                    <div className="flex items-center mt-5">
                      <label className="w-2/6 mr-5 text-lg opacity-50">
                        Title
                      </label>
                      <input
                        value={social.title}
                        onChange={(e) =>
                          editSocials(index, {
                            ...social,
                            title: e.target.value,
                          })
                        }
                        className="w-full mr-auto p-2 rounded-md shadow-lg border-2"
                        type="text"
                      ></input>
                    </div>
                    <div className="flex items-center mt-5">
                      <label className="w-2/6 mr-5 text-lg opacity-50">
                        Link
                      </label>
                      <input
                        value={social.link}
                        onChange={(e) =>
                          editSocials(index, {
                            ...social,
                            link: e.target.value,
                          })
                        }
                        className="w-full mr-auto p-2 rounded-md shadow-lg border-2"
                        type="text"
                      />
                    </div>
                    <hr className="my-10"></hr>
                  </div>
                ))}
                <div className="my-10">
                  <Button onClick={addSocials} type="primary">
                    Add Social +
                  </Button>
                </div>
              </div>
            )}
            {currentTabs === "RESUME" && (
              <div className="mt-10">
                <h1>Main</h1>
                <div className="mt-5 flex items-center">
                  <label className="w-2/6 mr-5 text-sx opacity-50">
                    Tagline
                  </label>
                  <input
                    value={data.resume.tagline}
                    onChange={(e) =>
                      setData({
                        ...data,
                        resume: { ...data.resume, tagline: e.target.value },
                      })
                    }
                    className="w-full mr-auto p-2 rounded-md shadow-lg border-2"
                    type="text"
                  ></input>
                </div>
                <div className="flex items-center mt-5">
                  <label className="w-2/6 mr-5 text-lg opacity-50">
                    Description
                  </label>
                  <textarea
                    value={data.resume.description}
                    onChange={(e) =>
                      setData({
                        ...data,
                        resume: { ...data.resume, description: e.target.value },
                      })
                    }
                    className="w-full mr-auto p-2 rounded-md shadow-lg border-2"
                  ></textarea>
                </div>
                <hr className="my-10"></hr>

                <h1>Experiences</h1>
                <div className="mt-10">
                  {data.resume.experiences.map((experiences, index) => (
                    <div className="mt-5" key={experiences.id}>
                      <div className="flex items-center justify-between">
                        <h1 className="text-2xl">{experiences.position}</h1>
                        <Button
                          // onClick={() => deleteProject(project.id)}
                          type="primary"
                        >
                          Delete
                        </Button>
                      </div>

                      <div className="flex items-center mt-5">
                        <label className="w-2/6 mr-5 text-lg opacity-50">
                          Dates
                        </label>
                        <input
                          value={experiences.dates}
                          onChange={(e) =>
                            handleEditExperiences(index, {
                              ...experiences,
                              dates: e.target.value,
                            })
                          }
                          className="w-full mr-auto p-2 rounded-md shadow-lg border-2"
                          type="text"
                        ></input>
                      </div>
                      <div className="flex items-center mt-2">
                        <label className="w-2/6 mr-5 text-lg opacity-50">
                          Type
                        </label>
                        <input
                          value={experiences.type}
                          onChange={(e) =>
                            handleEditExperiences(index, {
                              ...experiences,
                              type: e.target.value,
                            })
                          }
                          className="w-full mr-auto p-2 rounded-md shadow-lg border-2"
                          type="text"
                        ></input>
                      </div>
                      <div className="flex items-center mt-2">
                        <label className="w-2/6 mr-5 text-lg opacity-50">
                          Position
                        </label>
                        <input
                          value={experiences.position}
                          onChange={(e) =>
                            handleEditExperiences(index, {
                              ...experiences,
                              position: e.target.value,
                            })
                          }
                          className="w-full mr-auto p-2 rounded-md shadow-lg border-2"
                          type="text"
                        ></input>
                      </div>
                      <div className="mt-2 flex">
                        <label className="w-2/6 mr-5 text-lg opacity-50">
                          Bullets
                        </label>
                        <div className="w-full mr-auto flex flex-col">
                          <input
                            value={experiences.bullets}
                            onChange={(e) =>
                              handleEditExperiences(index, {
                                ...experiences,
                                bullets: e.target.value,
                              })
                            }
                            placeholder="Bullet One. #Bullet Two. #Bullet Three"
                            className="p-2 rounded-md shadow-lg border-2"
                            type="text"
                          ></input>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="my-10">
                  <Button onClick={handleAddExperiences} type="primary">
                    Add Experience +
                  </Button>
                </div>
                <hr className="my-10"></hr>
                <div className="mt-10">
                  <h1>Education</h1>
                  <div className="flex items-center mt-5">
                    <label className="w-2/6 mr-5 text-lg opacity-50">
                      Name
                    </label>
                    <input
                      value={data.resume.education.universityName}
                      onChange={(e) =>
                        setData({
                          ...data,
                          resume: {
                            ...data.resume,
                            education: {
                              ...data.resume.education,
                              universityName: e.target.value,
                            },
                          },
                        })
                      }
                      className="w-full mr-auto p-2 rounded-md shadow-lg border-2"
                      type="text"
                    ></input>
                  </div>
                  <div className="flex items-center mt-5">
                    <label className="w-2/6 mr-5 text-lg opacity-50">
                      Dates
                    </label>
                    <input
                      value={data.resume.education.universityDate}
                      onChange={(e) =>
                        setData({
                          ...data,
                          resume: {
                            ...data.resume,
                            education: {
                              ...data.resume.education,
                              universityDate: e.target.value,
                            },
                          },
                        })
                      }
                      className="w-full mr-auto p-2 rounded-md shadow-lg border-2"
                      type="text"
                    ></input>
                  </div>
                  <div className="flex items-center mt-5">
                    <label className="w-2/6 mr-5 text-lg opacity-50">
                      Detail
                    </label>
                    <input
                      value={data.resume.education.universityPara}
                      onChange={(e) =>
                        setData({
                          ...data,
                          resume: {
                            ...data.resume,
                            education: {
                              ...data.resume.education,
                              universityPara: e.target.value,
                            },
                          },
                        })
                      }
                      className="w-full mr-auto p-2 rounded-md shadow-lg border-2"
                      type="text"
                    ></input>
                  </div>
                </div>
                <hr className="my-10"></hr>
                <div className="mt-10">
                  <div className="flex">
                    <label className="w-2/6 mr-5 text-lg opacity-50">
                      Languages
                    </label>
                    <div className="w-full mr-auto flex flex-col">
                      {data.resume.languages.map((language, index) => (
                        <div key={index} className="flex">
                          <input
                            value={language}
                            onChange={(e) => {
                              setData({
                                ...data,
                                resume: {
                                  ...data.resume,
                                  languages: [
                                    ...data.resume.languages.slice(0, index),
                                    e.target.value,
                                    ...data.resume.languages.slice(index + 1),
                                  ],
                                },
                              });
                            }}
                            className="w-full p-2 rounded-md shadow-lg border-2"
                            type="text"
                          ></input>
                          <Button
                            onClick={() =>
                              setData({
                                ...data,
                                resume: {
                                  ...data.resume,
                                  languages: data.resume.languages.filter(
                                    (value, i) => index !== i,
                                  ),
                                },
                              })
                            }
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                      <Button
                        type="primary"
                        classes="hover:scale-100"
                        onClick={() =>
                          setData({
                            ...data,
                            resume: {
                              ...data.resume,
                              languages: [...data.resume.languages, "Added"],
                            },
                          })
                        }
                      >
                        Add +
                      </Button>
                    </div>
                  </div>
                  <hr className="my-10"></hr>
                  <div className="flex">
                    <label className="w-2/6 mr-5 text-lg opacity-50">
                      Frameworks
                    </label>
                    <div className="w-full mr-auto flex flex-col">
                      {data.resume.frameworks.map((framework, index) => (
                        <div key={index} className="flex">
                          <input
                            value={framework}
                            onChange={(e) => {
                              setData({
                                ...data,
                                resume: {
                                  ...data.resume,
                                  frameworks: [
                                    ...data.resume.frameworks.slice(0, index),
                                    e.target.value,
                                    ...data.resume.frameworks.slice(index + 1),
                                  ],
                                },
                              });
                            }}
                            className="w-full p-2 rounded-md shadow-lg border-2"
                            type="text"
                          ></input>
                          <Button
                            onClick={() =>
                              setData({
                                ...data,
                                resume: {
                                  ...data.resume,
                                  frameworks: data.resume.frameworks.filter(
                                    (value, i) => index !== i,
                                  ),
                                },
                              })
                            }
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                      <Button
                        onClick={() =>
                          setData({
                            ...data,
                            resume: {
                              ...data.resume,
                              frameworks: [...data.resume.frameworks, "Added"],
                            },
                          })
                        }
                        type="primary"
                        classes="hover:scale-100"
                      >
                        Add +
                      </Button>
                    </div>
                  </div>
                  <hr className="my-10"></hr>
                  <div className="flex">
                    <label className="w-2/6 mr-5 text-lg opacity-50">
                      Others
                    </label>
                    <div className="w-full mr-auto flex flex-col">
                      {data.resume.others.map((other, index) => (
                        <div key={index} className="flex">
                          <input
                            value={other}
                            onChange={(e) => {
                              setData({
                                ...data,
                                resume: {
                                  ...data.resume,
                                  others: [
                                    ...data.resume.others.slice(0, index),
                                    e.target.value,
                                    ...data.resume.others.slice(index + 1),
                                  ],
                                },
                              });
                            }}
                            className="w-full p-2 rounded-md shadow-lg border-2"
                            type="text"
                          ></input>
                          <Button
                            onClick={() =>
                              setData({
                                ...data,
                                resume: {
                                  ...data.resume,
                                  others: data.resume.others.filter(
                                    (value, i) => index !== i,
                                  ),
                                },
                              })
                            }
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                      <Button
                        onClick={() =>
                          setData({
                            ...data,
                            resume: {
                              ...data.resume,
                              others: [...data.resume.others, "Added"],
                            },
                          })
                        }
                        type="primary"
                        classes="hover:scale-100"
                      >
                        Add +
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {currentTabs === "CONTACT" && (
              <div className="mt-10">
                <div className="flex items-center">
                  <label className="w-2/6 mr-5 text-lg opacity-50">Email</label>
                  <input
                    value={data.email}
                    onChange={(e) =>
                      setData({ ...data, email: e.target.value })
                    }
                    className="w-full mr-auto p-2 rounded-md shadow-lg border-2"
                    type="text"
                  ></input>
                </div>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditData;
