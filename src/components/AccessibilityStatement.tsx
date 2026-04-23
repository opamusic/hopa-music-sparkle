import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AccessibilityStatementContent from "./AccessibilityStatementContent";

interface AccessibilityStatementProps {
  open: boolean;
  onClose: () => void;
  lang?: "he" | "en";
}

const AccessibilityStatement = ({ open, onClose, lang = "he" }: AccessibilityStatementProps) => {
  const title = lang === "he" ? "הצהרת נגישות" : "Accessibility Statement";

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        dir={lang === "he" ? "rtl" : "ltr"}
        className="max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl bg-card"
      >
        <DialogHeader>
          <DialogTitle className="font-heading text-2xl font-bold text-foreground">
            {title}
          </DialogTitle>
        </DialogHeader>
        <AccessibilityStatementContent lang={lang} />
      </DialogContent>
    </Dialog>
  );
};

export default AccessibilityStatement;
