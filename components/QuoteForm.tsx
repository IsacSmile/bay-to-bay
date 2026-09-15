"use client";

import React, { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Phone,
  Mail,
  Send,
  ArrowUpRight,
  ArrowLeft,
  ArrowRight,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Check,
} from "lucide-react";
import { QuoteFormData, QuoteFormSchema } from "@/lib/schemas/quote";
import { QuoteFormSectionData } from "@/lib/prisma";
import { EyebrowLabel } from "@/components/ui/EyebrowLabel";
import { FormField } from "@/components/ui/FormField";
import { DatePicker } from "@/components/ui/DatePicker";
import { CustomSelect } from "@/components/ui/CustomSelect";
import { getGSAP } from "@/lib/gsap";

interface QuoteFormProps {
  content: QuoteFormSectionData;
  contact: {
    phone: string;
    email?: string | null;
  };
}

const SESSION_STORAGE_KEY = "bay_quote_form_draft";

export const QuoteForm: React.FC<QuoteFormProps> = ({ content, contact }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [serverErrorMsg, setServerErrorMsg] = useState<string | null>(null);

  // Wizard state
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [slideDirection, setSlideDirection] = useState<"left" | "right">("left");

  const {
    register,
    handleSubmit,
    reset,
    control,
    trigger,
    watch,
    formState: { errors },
  } = useForm<QuoteFormData>({
    resolver: zodResolver(QuoteFormSchema),
    defaultValues: {
      fullName: "",
      companyName: "",
      phone: "",
      email: "",
      pickupLocation: "",
      deliveryLocation: "",
      preferredDate: "",
      frequency: "One time",
      packageCount: "",
      approxWeight: "",
      typeOfGoods: "",
      additionalInfo: "",
      website_hp: "",
    },
  });

  // 1. Entrance animation for form card
  useEffect(() => {
    const { gsap } = getGSAP();
    const card = cardRef.current;
    if (!card) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(card, { opacity: 1, y: 0 });
      return;
    }

    gsap.set(card, { opacity: 0, y: 24 });

    const ctx = gsap.context(() => {
      gsap.to(card, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        clearProps: "transform",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          once: true,
        },
      });
    }, card);

    return () => ctx.revert();
  }, []);

  // 2. SessionStorage Persistence: Restore draft on mount
  useEffect(() => {
    try {
      const savedDraft = sessionStorage.getItem(SESSION_STORAGE_KEY);
      if (savedDraft) {
        const parsed = JSON.parse(savedDraft);
        if (parsed.values) {
          reset(parsed.values);
        }
        if (parsed.step && typeof parsed.step === "number" && parsed.step >= 1 && parsed.step <= 3) {
          setCurrentStep(parsed.step);
        }
        if (parsed.completed && Array.isArray(parsed.completed)) {
          setCompletedSteps(new Set(parsed.completed));
        }
      }
    } catch (e) {
      console.error("Failed to restore form draft from sessionStorage:", e);
    }
  }, [reset]);

  // 3. SessionStorage Persistence: Save draft on value / step changes
  const formValues = watch();
  useEffect(() => {
    try {
      sessionStorage.setItem(
        SESSION_STORAGE_KEY,
        JSON.stringify({
          values: formValues,
          step: currentStep,
          completed: Array.from(completedSteps),
        })
      );
    } catch (e) {
      // Ignore storage quota error
    }
  }, [formValues, currentStep, completedSteps]);

  // Step Navigation Handlers
  const handleNextStep = async () => {
    let fieldsToValidate: (keyof QuoteFormData)[] = [];
    if (currentStep === 1) {
      fieldsToValidate = ["fullName", "phone", "email"];
    } else if (currentStep === 2) {
      fieldsToValidate = ["pickupLocation", "deliveryLocation", "preferredDate", "frequency"];
    }

    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setCompletedSteps((prev) => new Set(prev).add(currentStep));
      setSlideDirection("left");
      setCurrentStep((prev) => Math.min(3, prev + 1));
    }
  };

  const handleBackStep = () => {
    setSlideDirection("right");
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  const handleJumpToStep = (targetStep: number) => {
    if (targetStep < currentStep || completedSteps.has(targetStep - 1)) {
      setSlideDirection(targetStep < currentStep ? "right" : "left");
      setCurrentStep(targetStep);
    }
  };

  // Submitted Name state for thank-you message
  const [submittedName, setSubmittedName] = useState<string>("");

  // Final Submission Handler
  const onSubmit = async (data: QuoteFormData) => {
    // Block submission if not on final step (Step 3)
    if (currentStep < 3) {
      handleNextStep();
      return;
    }

    setSubmitStatus("loading");
    setServerErrorMsg(null);
    const namePart = data.fullName ? data.fullName.trim().split(" ")[0] : "";
    setSubmittedName(namePart);

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const responseData = await res.json();

      if (res.ok && responseData.success) {
        setSubmitStatus("success");
        // Clear sessionStorage draft on success
        try {
          sessionStorage.removeItem(SESSION_STORAGE_KEY);
        } catch (e) {}

        setTimeout(() => {
          reset();
          setCurrentStep(1);
          setCompletedSteps(new Set());
          setSubmittedName("");
          setSubmitStatus("idle");
        }, 8000);
      } else {
        setSubmitStatus("error");
        setServerErrorMsg(responseData.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      setSubmitStatus("error");
      setServerErrorMsg("Network error. Please try again or call us directly.");
    }
  };

  return (
    <section
      id="quote-form"
      className="w-full bg-[#EBF5FB]/60 py-16 sm:py-20 lg:py-24 border-b border-slate-200/60"
    >
      <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Content Block (~35%) */}
          <div className="lg:col-span-5 max-w-xl">
            {/* Eyebrow Label */}
            <EyebrowLabel text={content.eyebrow} />

            {/* Two-Tone Headline H2 */}
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[54px] xl:text-[62px] font-black text-[#071A2E] tracking-tight leading-[1.05] mb-5 sm:mb-6">
              <span className="block">{content.headingPrimary}</span>
              <span className="text-brand-blue block mt-1">{content.headingAccent}</span>
            </h2>

            {/* Description Paragraph */}
            <p className="text-slate-600 text-sm sm:text-base font-normal leading-relaxed mb-6 sm:mb-8">
              {content.description}
            </p>

            {/* Contact Details (Phone & Email) */}
            <div className="space-y-3.5 mb-8 sm:mb-10 text-sm sm:text-base font-extrabold text-[#071A2E]">
              <a
                href={`tel:${contact.phone.replace(/[^0-9]/g, "")}`}
                className="flex items-center gap-3 hover:text-brand-blue transition-colors group w-fit"
              >
                <div className="w-8 h-8 rounded-full bg-white border border-slate-200/80 flex items-center justify-center text-brand-blue shadow-2xs group-hover:scale-105 transition-transform">
                  <Phone className="w-4 h-4" />
                </div>
                <span>{contact.phone}</span>
              </a>

              {contact.email && (
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-3 hover:text-brand-blue transition-colors group w-fit"
                >
                  <div className="w-8 h-8 rounded-full bg-white border border-slate-200/80 flex items-center justify-center text-brand-blue shadow-2xs group-hover:scale-105 transition-transform">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span>{contact.email}</span>
                </a>
              )}
            </div>

            {/* Service Note Box */}
            <div className="bg-white/80 backdrop-blur-xs rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-2xs">
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                <strong className="font-black text-[#071A2E]">{content.serviceNoteLead} </strong>
                {content.serviceNoteText}
              </p>
            </div>
          </div>

          {/* Right Column: Form Card (~65%) */}
          <div className="lg:col-span-7 w-full">
            <div
              ref={cardRef}
              className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-200/80 shadow-floating relative"
            >
              {/* Top-Right Decorative Paper Plane Accent */}
              <div
                className="absolute top-6 right-6 sm:top-8 sm:right-8 w-10 h-10 rounded-full bg-[#E5F3FA] text-brand-blue flex items-center justify-center shrink-0 border border-[#CDE6F5] shadow-2xs select-none"
                aria-hidden="true"
              >
                <Send className="w-4 h-4" />
              </div>

              {/* Form Card Header */}
              <div className="mb-4 pr-12">
                <span className="text-[11px] font-black tracking-widest text-brand-blue uppercase block mb-1">
                  DELIVERY DETAILS
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-[#071A2E] tracking-tight">
                  Request my quote
                </h3>
              </div>

              {/* Progress Stepper Indicator */}
              <div className="mb-6 sm:mb-8 pt-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2.5">
                  <span className="text-[11px] font-black tracking-widest text-brand-blue uppercase">
                    STEP {currentStep} OF 3
                  </span>
                  <span className="font-extrabold text-[#071A2E]">
                    {currentStep === 1
                      ? "Contact Details"
                      : currentStep === 2
                      ? "Route & Schedule"
                      : "Shipment Specifications"}
                  </span>
                </div>

                {/* Stepper Segments */}
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3].map((stepNum) => {
                    const isCompleted = completedSteps.has(stepNum);
                    const isCurrent = currentStep === stepNum;
                    const isClickable = stepNum < currentStep || completedSteps.has(stepNum - 1);

                    return (
                      <button
                        key={stepNum}
                        type="button"
                        disabled={!isClickable}
                        onClick={() => handleJumpToStep(stepNum)}
                        className={`h-2.5 rounded-full transition-all duration-300 relative group ${
                          isCurrent
                            ? "bg-brand-blue shadow-2xs ring-2 ring-brand-blue/30"
                            : isCompleted
                            ? "bg-brand-blue/80 hover:bg-brand-blue cursor-pointer"
                            : "bg-slate-200 cursor-not-allowed"
                        }`}
                        title={`Step ${stepNum}: ${
                          stepNum === 1
                            ? "Contact Details"
                            : stepNum === 2
                            ? "Route & Schedule"
                            : "Shipment Details"
                        }`}
                      >
                        {isCompleted && (
                          <span className="absolute -top-1 right-0 translate-x-1/2 w-4 h-4 rounded-full bg-brand-blue text-white flex items-center justify-center text-[9px] font-black shadow-xs">
                            ✓
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Form Element */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (currentStep < 3) {
                    handleNextStep();
                  } else {
                    handleSubmit(onSubmit)(e);
                  }
                }}
                className="space-y-4 sm:space-y-5"
              >
                
                {/* Honeypot hidden input for bot detection */}
                <input
                  type="text"
                  {...register("website_hp")}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                {/* Animated Step Container */}
                <div
                  key={currentStep}
                  className="transition-all duration-200 ease-out animate-in fade-in zoom-in-98 min-h-[380px] sm:min-h-[360px]"
                >
                  {/* STEP 1: CONTACT DETAILS */}
                  {currentStep === 1 && (
                    <div className="space-y-4">
                      <div className="pb-1 border-b border-slate-100">
                        <span className="text-[11px] font-black tracking-widest text-slate-500 uppercase">
                          1. CONTACT INFORMATION
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                        {/* Full Name */}
                        <FormField label="Full Name" required error={errors.fullName?.message}>
                          <input
                            type="text"
                            {...register("fullName")}
                            placeholder="Your name"
                            className={`w-full px-3.5 py-2.5 sm:py-3 rounded-xl border text-sm font-medium text-slate-800 bg-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all duration-150 ${
                              errors.fullName
                                ? "border-rose-400 focus:border-rose-500 focus:ring-rose-200 text-rose-900"
                                : "border-slate-200/90"
                            }`}
                          />
                        </FormField>

                        {/* Company Name */}
                        <FormField label="Company Name" optional error={errors.companyName?.message}>
                          <input
                            type="text"
                            {...register("companyName")}
                            placeholder="Company (optional)"
                            className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl border border-slate-200/90 text-sm font-medium text-slate-800 bg-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all duration-150"
                          />
                        </FormField>

                        {/* Phone Number */}
                        <FormField label="Phone Number" required error={errors.phone?.message}>
                          <input
                            type="tel"
                            {...register("phone")}
                            placeholder="705-000-0000"
                            className={`w-full px-3.5 py-2.5 sm:py-3 rounded-xl border text-sm font-medium text-slate-800 bg-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all duration-150 ${
                              errors.phone
                                ? "border-rose-400 focus:border-rose-500 focus:ring-rose-200 text-rose-900"
                                : "border-slate-200/90"
                            }`}
                          />
                        </FormField>

                        {/* Email Address */}
                        <FormField label="Email Address" required error={errors.email?.message}>
                          <input
                            type="email"
                            {...register("email")}
                            placeholder="you@company.ca"
                            className={`w-full px-3.5 py-2.5 sm:py-3 rounded-xl border text-sm font-medium text-slate-800 bg-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all duration-150 ${
                              errors.email
                                ? "border-rose-400 focus:border-rose-500 focus:ring-rose-200 text-rose-900"
                                : "border-slate-200/90"
                            }`}
                          />
                        </FormField>
                      </div>
                    </div>
                  )}

                  {/* STEP 2: ROUTE & SCHEDULE */}
                  {currentStep === 2 && (
                    <div className="space-y-4">
                      <div className="pb-1 border-b border-slate-100">
                        <span className="text-[11px] font-black tracking-widest text-slate-500 uppercase">
                          2. ROUTE & SCHEDULE
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                        {/* Pickup Location */}
                        <FormField label="Pickup Location" required error={errors.pickupLocation?.message}>
                          <input
                            type="text"
                            {...register("pickupLocation")}
                            placeholder="City or address"
                            className={`w-full px-3.5 py-2.5 sm:py-3 rounded-xl border text-sm font-medium text-slate-800 bg-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all duration-150 ${
                              errors.pickupLocation
                                ? "border-rose-400 focus:border-rose-500 focus:ring-rose-200 text-rose-900"
                                : "border-slate-200/90"
                            }`}
                          />
                        </FormField>

                        {/* Delivery Location */}
                        <FormField label="Delivery Location" required error={errors.deliveryLocation?.message}>
                          <input
                            type="text"
                            {...register("deliveryLocation")}
                            placeholder="City or address"
                            className={`w-full px-3.5 py-2.5 sm:py-3 rounded-xl border text-sm font-medium text-slate-800 bg-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all duration-150 ${
                              errors.deliveryLocation
                                ? "border-rose-400 focus:border-rose-500 focus:ring-rose-200 text-rose-900"
                                : "border-slate-200/90"
                            }`}
                          />
                        </FormField>

                        {/* Preferred Pickup Date */}
                        <FormField label="Preferred Pickup Date" required error={errors.preferredDate?.message}>
                          <Controller
                            control={control}
                            name="preferredDate"
                            render={({ field }) => (
                              <DatePicker
                                value={field.value}
                                onChange={field.onChange}
                                error={errors.preferredDate?.message}
                              />
                            )}
                          />
                        </FormField>

                        {/* Frequency Select */}
                        <FormField label="How Often Do You Need Delivery?" required error={errors.frequency?.message}>
                          <Controller
                            control={control}
                            name="frequency"
                            render={({ field }) => (
                              <CustomSelect
                                value={field.value}
                                onChange={field.onChange}
                                options={[
                                  "One time",
                                  "Twice weekly",
                                  "Weekly",
                                  "Monthly",
                                  "Custom",
                                ]}
                                error={errors.frequency?.message}
                              />
                            )}
                          />
                        </FormField>
                      </div>
                    </div>
                  )}

                  {/* STEP 3: SHIPMENT DETAILS */}
                  {currentStep === 3 && (
                    <div className="space-y-4">
                      <div className="pb-1 border-b border-slate-100">
                        <span className="text-[11px] font-black tracking-widest text-slate-500 uppercase">
                          3. SHIPMENT SPECIFICATIONS
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                        {/* Number of Packages */}
                        <FormField label="Number of Packages" optional error={errors.packageCount?.message}>
                          <input
                            type="text"
                            {...register("packageCount")}
                            placeholder="e.g. 4"
                            className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl border border-slate-200/90 text-sm font-medium text-slate-800 bg-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all duration-150"
                          />
                        </FormField>

                        {/* Approximate Weight */}
                        <FormField label="Approximate Weight" optional error={errors.approxWeight?.message}>
                          <input
                            type="text"
                            {...register("approxWeight")}
                            placeholder="e.g. 20 kg"
                            className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl border border-slate-200/90 text-sm font-medium text-slate-800 bg-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all duration-150"
                          />
                        </FormField>
                      </div>

                      {/* Type of Goods (Full width) */}
                      <FormField label="Type of Goods" optional error={errors.typeOfGoods?.message}>
                        <input
                          type="text"
                          {...register("typeOfGoods")}
                          placeholder="Medical supplies, documents, small goods, etc."
                          className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl border border-slate-200/90 text-sm font-medium text-slate-800 bg-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all duration-150"
                        />
                      </FormField>

                      {/* Additional Information (Full width Textarea) */}
                      <FormField label="Additional Information" required error={errors.additionalInfo?.message}>
                        <textarea
                          rows={3}
                          {...register("additionalInfo")}
                          placeholder="Tell us about timing, dimensions, handling requirements, or multiple locations."
                          className={`w-full px-3.5 py-2.5 sm:py-3 rounded-xl border text-sm font-medium text-slate-800 bg-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all duration-150 resize-y ${
                            errors.additionalInfo
                              ? "border-rose-400 focus:border-rose-500 focus:ring-rose-200 text-rose-900"
                              : "border-slate-200/90"
                          }`}
                        />
                      </FormField>
                    </div>
                  )}
                </div>

                {/* Server Error Alert Banner */}
                {submitStatus === "error" && (
                  <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm font-bold flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                    <span>{serverErrorMsg || "Something went wrong, please try again or call us directly."}</span>
                  </div>
                )}

                {/* Success Alert Banner */}
                {submitStatus === "success" && (
                  <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 shadow-xs animate-in fade-in zoom-in-98 duration-200 space-y-1">
                    <div className="flex items-center gap-2 font-black text-sm sm:text-base text-emerald-800">
                      <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600" />
                      <span>Thank you{submittedName ? `, ${submittedName}` : ""}!</span>
                    </div>
                    <p className="text-xs sm:text-sm text-emerald-700 font-medium leading-relaxed pl-7">
                      Your quote request has been submitted. Our dispatch team will review your shipment details and get back to you within 12 hours.
                    </p>
                  </div>
                )}

                {/* Wizard Navigation Bar */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  {currentStep > 1 ? (
                    <button
                      type="button"
                      onClick={handleBackStep}
                      className="px-4 py-2.5 sm:py-3 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs sm:text-sm hover:bg-slate-100 transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>
                  ) : (
                    <div />
                  )}

                  {currentStep < 3 ? (
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="px-6 py-3 sm:py-3.5 bg-brand-blue hover:bg-[#0878D1] active:scale-[0.99] text-white font-extrabold rounded-xl text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer ml-auto"
                    >
                      <span>Next Step</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={submitStatus === "loading"}
                      className="px-6 py-3.5 sm:py-4 bg-brand-blue hover:bg-[#0878D1] active:scale-[0.99] text-white font-extrabold rounded-xl sm:rounded-2xl text-xs sm:text-base shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed ml-auto"
                    >
                      {submitStatus === "loading" ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Submitting request...</span>
                        </>
                      ) : submitStatus === "success" ? (
                        <>
                          <CheckCircle2 className="w-5 h-5" />
                          <span>Request Sent</span>
                        </>
                      ) : (
                        <>
                          <span>Request my quote</span>
                          <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
                        </>
                      )}
                    </button>
                  )}
                </div>

                {/* Disclaimer below button */}
                <p className="text-[11px] sm:text-xs text-slate-400 font-medium text-center mt-2 leading-relaxed">
                  {content.disclaimer}
                </p>

              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
