interface HeaderProps {
  headings: string[];
}

const Header = ({ headings }: HeaderProps) => (
  <>
    {headings.map((heading) => (
      <span key={heading}>{heading}</span>
    ))}
  </>
);

export default Header;
