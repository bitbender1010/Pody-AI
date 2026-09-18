"use client";

import { FileText, ImageIcon, Mic, Paperclip, SendHorizontal, X } from "lucide-react";
import { useEffect, useRef, useState, type Ref } from "react";

function Attachment({ file, onRemove }: { file: File; onRemove: () => void }) {
  const [preview, setPreview] = useState<string>();
  const isImage = file.type.startsWith("image/");

  useEffect(() => {
    if (!isImage) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file, isImage]);

  return (
    <li className="flex min-w-0 items-center gap-2 rounded-lg border border-line px-2 py-2">
      <div className="grid size-9 shrink-0 place-items-center overflow-hidden rounded-md bg-slate-50 text-slate-500">
        {preview ? (
          // Local object URLs are released when an attachment is removed.
          // eslint-disable-next-line @next/next/no-img-element
          <img src={preview} alt="" className="size-9 object-cover" />
        ) : isImage ? <ImageIcon className="size-4" /> : <FileText className="size-4" />}
      </div>
      <span className="min-w-0 flex-1 truncate text-xs text-slate-600" title={file.name}>{file.name}</span>
      <button type="button" onClick={onRemove} aria-label={`Remove ${file.name}`} title={`Remove ${file.name}`}
        className="grid size-7 shrink-0 place-items-center rounded-md text-slate-400 hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-undp">
        <X className="size-3.5" aria-hidden="true" />
      </button>
    </li>
  );
}

export function ChatInput({ value, onChange, inputRef }: {
  value: string;
  onChange: (value: string) => void;
  inputRef: Ref<HTMLTextAreaElement>;
}) {
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState("");
  const fileInput = useRef<HTMLInputElement>(null);

  return (
    <div className="mx-auto mt-6 w-full shrink-0">
      <div className="min-h-[116px] rounded-[17px] border border-[#DEDFDF] bg-white p-3.5 shadow-soft">
        <input
          ref={fileInput}
          type="file"
          accept="image/*,application/pdf,.pdf"
          multiple
          className="hidden"
          aria-label="Choose images or PDFs"
          onChange={(event) => {
            const selected = Array.from(event.target.files ?? []);
            const accepted = selected.filter((file) => file.type.startsWith("image/") || file.type === "application/pdf" || (!file.type && /\.pdf$/i.test(file.name)));
            setError(accepted.length !== selected.length ? "Only images and PDF files are accepted." : "");
            setFiles((current) => [...current, ...accepted.filter((file) => !current.some((existing) => existing.name === file.name && existing.size === file.size && existing.lastModified === file.lastModified))]);
            event.target.value = "";
          }}
        />
        {files.length > 0 && (
          <ul aria-label="Attachments" className="mb-3 grid max-h-40 gap-2 overflow-y-auto sm:grid-cols-2">
            {files.map((file, index) => <Attachment key={`${file.name}-${file.size}-${file.lastModified}`} file={file} onRemove={() => setFiles((current) => current.filter((_, i) => i !== index))} />)}
          </ul>
        )}
        {error && <p role="alert" className="mb-2 text-xs text-red-600">{error}</p>}
        <textarea
          ref={inputRef}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="How can I help you today?"
          aria-label="Message"
          className="h-[58px] w-full resize-none bg-transparent text-sm leading-6 text-ink outline-none placeholder:text-slate-400"
        />
        <div className="flex items-center justify-between gap-3">
          <button
            className="grid size-8 place-items-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
            type="button"
            onClick={() => fileInput.current?.click()}
            aria-label="Attach file"
            title="Attach images or PDFs"
          >
            <Paperclip className="size-[18px]" aria-hidden="true" />
          </button>
          <div className="flex items-center gap-2">
            <span className="px-1.5 text-xs font-normal text-slate-500">
              Auto (EN/FR)
            </span>
            <button
              className="grid size-9 place-items-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
              type="button"
              aria-label="Use microphone"
              title="Use microphone"
            >
              <Mic className="size-[18px]" aria-hidden="true" />
            </button>
            <button
              className="grid size-9 place-items-center rounded-full bg-ink text-white transition hover:bg-slate-700"
              type="button"
              aria-label="Send message"
              title="Send message"
            >
              <SendHorizontal className="size-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
      <p className="mt-2.5 text-center text-[11px] text-slate-400">
        You can ask questions in English or French. I&apos;ll do my best to
        help.
      </p>
    </div>
  );
}
