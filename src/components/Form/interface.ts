import { ChangeEvent, FormEvent, InputHTMLAttributes } from "react";
import { IconName } from "../Icon";

export interface GenericInputProps
extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
label?: string;
labelDesc?: string;
iconAlign?: string;
rows?: number;
isLoading?: boolean;
focus?: boolean;
optional?: boolean;
iconName?: IconName;
onClear?: (_e?: FormEvent<HTMLButtonElement>) => void;
inputClass?: string;
containerClassName?: string;
// eslint-disable-next-line no-unused-vars
handleChange?: (e: ChangeEvent<HTMLInputElement | any>) => void;
error?: string;
}