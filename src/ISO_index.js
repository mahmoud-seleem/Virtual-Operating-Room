import '@kitware/vtk.js/favicon';

// Load the rendering pieces we want to use (for both WebGL and WebGPU)
import '@kitware/vtk.js/Rendering/Profiles/Geometry';

// Force DataAccessHelper to have access to various data source
import '@kitware/vtk.js/IO/Core/DataAccessHelper/HtmlDataAccessHelper';
import '@kitware/vtk.js/IO/Core/DataAccessHelper/HttpDataAccessHelper';
import '@kitware/vtk.js/IO/Core/DataAccessHelper/JSZipDataAccessHelper';

import vtkActor from '@kitware/vtk.js/Rendering/Core/Actor';
import vtkFullScreenRenderWindow from '@kitware/vtk.js/Rendering/Misc/FullScreenRenderWindow';
import vtkHttpDataSetReader from '@kitware/vtk.js/IO/Core/HttpDataSetReader';
import vtkImageMarchingCubes from '@kitware/vtk.js/Filters/General/ImageMarchingCubes';
import vtkMapper from '@kitware/vtk.js/Rendering/Core/Mapper';

// import controlPanel from './controller.html';
const controlPanel = `
<table>
<label>ISOvalue</label>
  <tr>
    <td>
      <input class="resolution" type="range" min="4" max="80" value="6" />
    </td>
  </tr>
</table>
`;
// let contr = `
// <button type="button" style="  position: fixed;
//   bottom: 0;
//   right: 0;
//   width: 300px;">Click Me!</button>
// `;
const c1 = document.createElement("div")
const c2 = document.createElement("div")
    // document.body.appendChild()
const fullScreenRenderWindow = vtkFullScreenRenderWindow.newInstance({
    background: [0, 0, 0],
    rootContainer: c1,
});
const fullScreenRenderWindowd_2 = vtkFullScreenRenderWindow.newInstance({
    background: [0, 0, 0],
    rootContainer: c2,
});
const renderWindow_2 = fullScreenRenderWindowd_2.getRenderWindow();
const renderer_2 = fullScreenRenderWindowd_2.getRenderer();

const renderWindow = fullScreenRenderWindow.getRenderWindow();
const renderer = fullScreenRenderWindow.getRenderer();
renderWindow_2.render();

fullScreenRenderWindow.addController(controlPanel);
const actor = vtkActor.newInstance();
const mapper = vtkMapper.newInstance();
const marchingCube = vtkImageMarchingCubes.newInstance({
    contourValue: 0.0,
    computeNormals: true,
    mergePoints: true,
});

actor.setMapper(mapper);
mapper.setInputConnection(marchingCube.getOutputPort());

function updateIsoValue(e) {
    const isoValue = Number(e.target.value);
    marchingCube.setContourValue(isoValue);
    renderWindow.render();
}

const reader = vtkHttpDataSetReader.newInstance({ fetchGzip: true });
marchingCube.setInputConnection(reader.getOutputPort());

reader
    .setUrl(`https://kitware.github.io/vtk-js/data/volume/headsq.vti`, { loadData: true })
    .then(() => {
        const data = reader.getOutputData();
        const dataRange = data.getPointData().getScalars().getRange();
        const firstIsoValue = (dataRange[0] + dataRange[1]) / 3;

        const el = document.querySelector('.resolution');
        el.setAttribute('min', dataRange[0]);
        el.setAttribute('max', dataRange[1]);
        el.setAttribute('value', firstIsoValue);
        el.addEventListener('input', updateIsoValue);

        marchingCube.setContourValue(firstIsoValue);
        renderer.addActor(actor);
        renderer.getActiveCamera().set({ position: [1, 1, 0], viewUp: [0, 0, -1] });
        renderer.resetCamera();
        renderWindow.render();
    });
document.body.appendChild(c1)
document.body.appendChild(c2)
fullScreenRenderWindow.getContainer().style.width = "50%"
fullScreenRenderWindowd_2.getContainer().style.width = "50%"
fullScreenRenderWindow.getContainer().style.left = "50%"

// global.fullScreen = fullScreenRenderWindow;
global.actor = actor;
global.mapper = mapper;
global.marchingCube = marchingCube;