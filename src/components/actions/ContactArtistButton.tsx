import Button from "../ui/Button";

type ContactArtistButtonProps = {
  label?: string;
};

export default function ContactArtistButton({
  label = "Contact Artist",
}: ContactArtistButtonProps) {
  return (
    <Button variant="secondary" fullWidth>
      {label}
    </Button>
  );
}
