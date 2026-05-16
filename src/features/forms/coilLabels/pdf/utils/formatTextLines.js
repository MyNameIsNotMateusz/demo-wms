export const formatTextLines = (text) => {
  if (!text) {
    return [""];
  }

  const firstLineMax = 15;
  const otherLinesMax = 20;

  const dashIndex = text.indexOf("-");

  let part1;
  let part2;

  if (dashIndex !== -1) {
    part1 = text.slice(0, dashIndex + 1);

    part2 = text.slice(dashIndex + 1);
  } else {
    part1 = text;
    part2 = "";
  }

  const lines = [];

  if (part1.length <= firstLineMax) {
    lines.push(part1);

    if (part2.length > 0) {
      lines.push(part2.slice(0, otherLinesMax));
    }
  } else {
    lines.push(part1.slice(0, firstLineMax));

    const remainingPart1 = part1.slice(firstLineMax);

    lines.push(remainingPart1.slice(0, otherLinesMax));

    if (part2.length > 0) {
      lines.push(part2.slice(0, otherLinesMax));
    }
  }

  return lines;
};
