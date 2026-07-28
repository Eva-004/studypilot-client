"use client";

import { StudyPlan } from "@/app/manage-plans/page";
import {
    Button,
    Input,
    Label,
    Modal,
    Surface,
    TextField,
} from "@heroui/react";
import { useState } from "react";
import { FiEdit3 } from "react-icons/fi";

interface UpdatePlanProps {
    plan: StudyPlan;
    onUpdate: (
        planId: string,
        updates: Partial<StudyPlan>
    ) => Promise<void>;
}

const UpdatePlan = ({
    plan,
    onUpdate,
}: UpdatePlanProps) => {

    // Original DB values
    const [title, setTitle] = useState(plan.title);
    const [subject, setSubject] = useState(plan.subject);
    const [examDate, setExamDate] = useState(plan.examDate);
    const [dailyHours, setDailyHours] = useState(
        String(plan.dailyHours)
    );

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        const updatedFields: Partial<StudyPlan> = {};

        // Only changed fields will be added
        if (title !== plan.title) {
            updatedFields.title = title;
        }

        if (subject !== plan.subject) {
            updatedFields.subject = subject;
        }

        if (examDate !== plan.examDate) {
            updatedFields.examDate = examDate;
        }

        if (dailyHours !== String(plan.dailyHours)) {
            updatedFields.dailyHours = Number(dailyHours);
        }

        // Nothing changed
        if (Object.keys(updatedFields).length === 0) {
            console.log("Nothing to update");
            return;
        }

        console.log("Only changed fields:", updatedFields);

        await onUpdate(plan._id, updatedFields);
    };

    return (
        <Modal>

            {/* Edit Button */}
            <Modal.Trigger
                className="p-2 text-[#4F46E5] hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer"
            >
                <FiEdit3 className="text-base" />
            </Modal.Trigger>

            <Modal.Backdrop>
                <Modal.Container placement="auto">
                    <Modal.Dialog className="sm:max-w-md">

                        <Modal.CloseTrigger />

                        <Modal.Header>
                            <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                                <FiEdit3 className="text-base" />
                            </Modal.Icon>

                            <Modal.Heading>
                                Update Plan
                            </Modal.Heading>
                        </Modal.Header>

                        <Modal.Body className="p-6">
                            <Surface variant="default">

                                <form
                                    onSubmit={handleSubmit}
                                    className="flex flex-col gap-4"
                                >

                                    {/* Title */}
                                    <TextField
                                        className="w-full"
                                        name="title"
                                        type="text"
                                        variant="secondary"
                                    >
                                        <Label>Plan Title</Label>

                                        <Input
                                            placeholder="Enter your plan title"
                                            value={title}
                                            onChange={(e) =>
                                                setTitle(e.target.value)
                                            }
                                        />
                                    </TextField>

                                    {/* Subject */}
                                    <TextField
                                        className="w-full"
                                        name="subject"
                                        type="text"
                                        variant="secondary"
                                    >
                                        <Label>Subject</Label>

                                        <Input
                                            placeholder="Enter subject"
                                            value={subject}
                                            onChange={(e) =>
                                                setSubject(e.target.value)
                                            }
                                        />
                                    </TextField>

                                    {/* Exam Date */}
                                    <TextField
                                        className="w-full"
                                        name="examDate"
                                        type="date"
                                        variant="secondary"
                                    >
                                        <Label>Exam Date</Label>

                                        <Input
                                            value={examDate}
                                            onChange={(e) =>
                                                setExamDate(e.target.value)
                                            }
                                        />
                                    </TextField>

                                    {/* Daily Hours */}
                                    <TextField
                                        className="w-full"
                                        name="dailyHours"
                                        type="number"
                                        variant="secondary"
                                    >
                                        <Label>Daily Study Hours</Label>

                                        <Input
                                            placeholder="Enter daily study hours"
                                            value={dailyHours}
                                            onChange={(e) =>
                                                setDailyHours(e.target.value)
                                            }
                                        />
                                    </TextField>

                                    <Modal.Footer>

                                        <Button
                                            slot="close"
                                            variant="secondary"
                                        >
                                            Cancel
                                        </Button>

                                        <Button
                                            type="submit"
                                             
                                        >
                                            Update
                                        </Button>

                                    </Modal.Footer>

                                </form>

                            </Surface>
                        </Modal.Body>

                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>

        </Modal>
    );
};

export default UpdatePlan;