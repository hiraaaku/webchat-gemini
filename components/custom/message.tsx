"use client";

import { Attachment, ToolInvocation } from "ai";
import { motion } from "framer-motion";
import { Fragment } from "react";

import { cn } from "@/lib/utils";

import { BotIcon, UserIcon } from "./icons";
import { Markdown } from "./markdown";
import { PreviewAttachment } from "./preview-attachment";
import { Weather } from "./weather";
import { AuthorizePayment } from "../flights/authorize-payment";
import { DisplayBoardingPass } from "../flights/boarding-pass";
import { CreateReservation } from "../flights/create-reservation";
import { FlightStatus } from "../flights/flight-status";
import { ListFlights } from "../flights/list-flights";
import { SelectSeats } from "../flights/select-seats";
import { VerifyPayment } from "../flights/verify-payment";
import ImageMessage from "./message-type/image-message";
import TableMessage from "./message-type/table-message";

type Content = {
  result: string | { Tahun: string; Bulan: string; Total_Penjualan: string }[];
  image_url: string;
  type: "text" | "image" | "table";
  explanation: string;
};

export const Message = ({
  chatId,
  role,
  content,
  toolInvocations,
  attachments,
}: {
  chatId: string;
  role: string;
  content: string | Content;
  toolInvocations: Array<ToolInvocation> | undefined;
  attachments?: Array<Attachment>;
}) => {
  return (
    <motion.div
      className={`flex flex-row gap-4 px-4 w-full md:w-[500px] md:px-0 first-of-type:pt-20`}
      initial={{ y: 5, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <div
        className={cn(
          "flex gap-4 px-4 w-full",
          role === "assistant" ? "justify-start" : "justify-end"
        )}
      >
        {role === "assistant" && (
          <div className="size-[24px] border rounded-sm p-1 flex flex-col justify-center items-center shrink-0 text-zinc-500">
            <BotIcon />
          </div>
        )}

        <div className="flex flex-col gap-2">
          {typeof content === "string" && (
            <div className="text-zinc-800 dark:text-zinc-300 flex flex-col gap-4">
              <Markdown>{content}</Markdown>
            </div>
          )}
          {typeof content !== "string" &&
            content.type === "text" &&
            typeof content.result === "string" && (
              <Fragment>
                <div className="text-zinc-800 dark:text-zinc-300 flex flex-col gap-4">
                  <Markdown>{content.result || content.explanation}</Markdown>
                </div>
                <div className="text-zinc-800 dark:text-zinc-300 flex flex-col gap-4 mt-2">
                  <Markdown>{content.explanation}</Markdown>
                </div>
              </Fragment>
            )}
          {typeof content !== "string" && content.type === "image" && (
            <Fragment>
              {content.image_url ? (
                <Fragment>
                  <ImageMessage
                    src={content.image_url}
                    fallbackSrc="/images/fallback.png"
                    alt={
                      typeof content.result === "string"
                        ? content.result
                        : "image"
                    }
                  />
                  <div className="text-zinc-800 dark:text-zinc-300 flex flex-col gap-4 mt-2">
                    <Markdown>{content.explanation}</Markdown>
                  </div>
                </Fragment>
              ) : (
                <div className="text-zinc-800 dark:text-zinc-300 flex flex-col gap-4">
                  <Markdown>{content.explanation}</Markdown>
                </div>
              )}
            </Fragment>
          )}

          {typeof content !== "string" && content.type === "table" && (
            <Fragment>
              {content.result?.length ? (
                <Fragment>
                  <TableMessage
                    data={
                      typeof content.result !== "string" ? content.result : []
                    }
                  />
                  <div className="text-zinc-800 dark:text-zinc-300 flex flex-col gap-4 mt-2">
                    <Markdown>{content.explanation}</Markdown>
                  </div>
                </Fragment>
              ) : (
                <div className="text-zinc-800 dark:text-zinc-300 flex flex-col gap-4">
                  <Markdown>{content.explanation}</Markdown>
                </div>
              )}
            </Fragment>
          )}

          {toolInvocations && (
            <div className="flex flex-col gap-4">
              {toolInvocations.map((toolInvocation) => {
                const { toolName, toolCallId, state } = toolInvocation;

                if (state === "result") {
                  const { result } = toolInvocation;

                  return (
                    <div key={toolCallId}>
                      {toolName === "getWeather" ? (
                        <Weather weatherAtLocation={result} />
                      ) : toolName === "displayFlightStatus" ? (
                        <FlightStatus flightStatus={result} />
                      ) : toolName === "searchFlights" ? (
                        <ListFlights chatId={chatId} results={result} />
                      ) : toolName === "selectSeats" ? (
                        <SelectSeats chatId={chatId} availability={result} />
                      ) : toolName === "createReservation" ? (
                        Object.keys(result).includes("error") ? null : (
                          <CreateReservation reservation={result} />
                        )
                      ) : toolName === "authorizePayment" ? (
                        <AuthorizePayment intent={result} />
                      ) : toolName === "displayBoardingPass" ? (
                        <DisplayBoardingPass boardingPass={result} />
                      ) : toolName === "verifyPayment" ? (
                        <VerifyPayment result={result} />
                      ) : (
                        <div>{JSON.stringify(result, null, 2)}</div>
                      )}
                    </div>
                  );
                } else {
                  return (
                    <div key={toolCallId} className="skeleton">
                      {toolName === "getWeather" ? (
                        <Weather />
                      ) : toolName === "displayFlightStatus" ? (
                        <FlightStatus />
                      ) : toolName === "searchFlights" ? (
                        <ListFlights chatId={chatId} />
                      ) : toolName === "selectSeats" ? (
                        <SelectSeats chatId={chatId} />
                      ) : toolName === "createReservation" ? (
                        <CreateReservation />
                      ) : toolName === "authorizePayment" ? (
                        <AuthorizePayment />
                      ) : toolName === "displayBoardingPass" ? (
                        <DisplayBoardingPass />
                      ) : null}
                    </div>
                  );
                }
              })}
            </div>
          )}

          {attachments && (
            <div className="flex flex-row gap-2">
              {attachments.map((attachment) => (
                <PreviewAttachment
                  key={attachment.url}
                  attachment={attachment}
                />
              ))}
            </div>
          )}
        </div>
        {role !== "assistant" && (
          <div className="size-[24px] border rounded-sm p-1 flex flex-col justify-center items-center shrink-0 text-zinc-500">
            <UserIcon />
          </div>
        )}
      </div>
    </motion.div>
  );
};
