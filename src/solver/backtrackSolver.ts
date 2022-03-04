import { arb_set, getCSPwithVars } from "../utils.ts";
export { solve };
import { SolutionProcessor } from "../solutionProcessors.ts";
import { CSP, CSPwithVars } from "./CSP.ts";
import { t_assignment } from "./assignment.ts";
import { preprocess_csp } from "../utils.ts";

export function isConsistent(
  variable: string,
  value: string | number,
  oldAssignment: t_assignment,
  constraints: Set<[string, Set<string>]>,
) {
  const assignment = { ...oldAssignment };
  assignment[variable] = value;
  for (const [cons, vars] of constraints) {
    if (
      vars.has(variable) &&
      Array.from(vars).every((val) => new Set(Object.keys(assignment)).has(val))
    ) {
      if (!(eval(cons))) {
        return false;
      }
    }
  }
  return true;
}

function backtrack(
  assignment: t_assignment,
  unassignedVars: Set<string>,
  csp: CSPwithVars,
  solutionProcessor?: SolutionProcessor,
): t_assignment | null {
  if (unassignedVars.size == 0) {
    if (solutionProcessor) {
      solutionProcessor.processSolution(assignment);
      return null;
    } else {
      return assignment;
    }
  }
  const variable = arb_set(unassignedVars);
  unassignedVars.delete(variable);
  for (const value of csp.values) {
    if (isConsistent(variable, value, assignment, csp.constraints)) {
      const newAssignment = { ...assignment };
      newAssignment[variable] = value;
      const result = backtrack(
        newAssignment,
        unassignedVars,
        csp,
        solutionProcessor,
      );
      if (result) {
        return result;
      }
    }
  }
  unassignedVars.add(variable);
  return null;
}

function solve(csp: CSP, solutionProcessor?: SolutionProcessor) {
  const preprocessed_csp: CSP = preprocess_csp(csp);
  const unassignedVars: Set<string> = new Set(csp.variables);
  return backtrack(
    {},
    unassignedVars,
    getCSPwithVars(preprocessed_csp),
    solutionProcessor,
  );
}