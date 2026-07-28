"use client";

import { StudyPlan } from "@/app/manage-plans/page";
import { AlertDialog, Button } from "@heroui/react";
import { useState } from "react";
import { FiTrash2 } from "react-icons/fi";

interface DeletePlanProps {
    plan: StudyPlan;
    onDelete: (planId: string) => Promise<void>;
}

const DeletePlan = ({ plan, onDelete }: DeletePlanProps) => {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        try {
            setIsDeleting(true);
            await onDelete(plan._id);
        } catch (error) {
            console.error("Failed to delete plan:", error);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <AlertDialog>
            {/* Delete Trigger Button */}
            <AlertDialog.Trigger>
                <button
                    className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                    title="Delete Plan"
                >
                    <FiTrash2 className="text-base" />
                </button>
            </AlertDialog.Trigger>

            <AlertDialog.Backdrop>
                <AlertDialog.Container>
                    <AlertDialog.Dialog className="sm:max-w-[400px]">
                        <AlertDialog.CloseTrigger />
                        <AlertDialog.Header>
                            <AlertDialog.Icon status="danger" />
                            <AlertDialog.Heading>Delete Plan permanently?</AlertDialog.Heading>
                        </AlertDialog.Header>
                        <AlertDialog.Body>
                            <p>
                                This will permanently delete <strong>{plan.title}</strong> ({plan.subject}) and all of its data. This action cannot be undone.
                            </p>
                        </AlertDialog.Body>
                        <AlertDialog.Footer>
                            <Button slot="close" variant="tertiary" isDisabled={isDeleting}>
                                Cancel
                            </Button>
                            <Button
                                slot="close"
                                variant="danger"
                                onClick={handleDelete}
                                isDisabled={isDeleting}
                            >
                                {isDeleting ? "Deleting..." : "Delete Plan"}
                            </Button>
                        </AlertDialog.Footer>
                    </AlertDialog.Dialog>
                </AlertDialog.Container>
            </AlertDialog.Backdrop>
        </AlertDialog>
    );
};

export default DeletePlan;