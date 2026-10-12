import { AlertDialog } from "radix-ui";

function ConfirmDialog({
  trigger,
  title,
  description,
  confirmText = "Confirm",
  notConfirmText = "Cancel",
  onConfirm,
}) {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        {trigger}
      </AlertDialog.Trigger>

      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed z-100 inset-0 bg-black/80 backdrop-blur-sm" />

        <AlertDialog.Content
          className="
         z-100
            fixed left-1/2 top-1/2
            w-[90%] max-w-md
            -translate-x-1/2 -translate-y-1/2
            bg-[#f8f7f4]
            p-6
            text-black
            tracking-wider
            shadow-2xl
            rounded-2xl
          "
        >
          <AlertDialog.Title className="text-2xl font-bold">
            {title}
          </AlertDialog.Title>

          <AlertDialog.Description className="mt-2 text-md text-black/90">
            {description}
          </AlertDialog.Description>

          <div className="mt-6 flex justify-end gap-3">
            <AlertDialog.Cancel asChild>
              <button className="px-4 py-2 text-sm text-black/90 cursor-pointer hover:text-black">
                {notConfirmText}
              </button>
            </AlertDialog.Cancel>

            <AlertDialog.Action asChild>
              <button
                onClick={onConfirm}
                className="bg-[#0057ff] cursor-pointer rounded-xl px-4 py-2 text-sm font-semibold text-white hover:bg-[#1966ff]"
              >
                {confirmText}
              </button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}

export default ConfirmDialog;