export async function loadProjects(){
  const r = await fetch("/data/projects.json");
  return r.json();
}
