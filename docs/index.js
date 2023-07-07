/*
(c) 2023 Scot Watson  All Rights Reserved
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

"use strict";

const initPageTime = performance.now();

const asyncWindow = new Promise(function (resolve, reject) {
  window.addEventListener("load", function (evt) {
    resolve(evt);
  });
});

const asyncErrorLog = (async function () {
  try {
    const module = await import("https://scotwatson.github.io/Debug/20230705/ErrorLog.mjs");
    return module;
  } catch (e) {
    console.error(e);
  }
})();

const asyncModule1 = (async function () {
  try {
    const module = await import("https://scotwatson.github.io/ModuleTest/module1.mjs");
    return module;
  } catch (e) {
    console.error(e);
  }
})();

const asyncModule2 = (async function () {
  try {
    const module = await import("https://scotwatson.github.io/ModuleTest/module2.mjs");
    return module;
  } catch (e) {
    console.error(e);
  }
})();

(async function () {
  try {
    const modules = await Promise.all( [ asyncWindow, asyncErrorLog, asyncModule1, asyncModule2 ] );
    start(modules);
  } catch (e) {
    console.error(e);
  }
})();

async function start( [ evtWindow, ErrorLog, Module1, Module2 ] ) {
  try {
    const Test = Module1.Test;
    const ForwardedTest = Module1.funcTest();
    console.log(Test === ForwardedTest);
    console.log(Module1.obj === Module2.obj);
    console.log(Module1.obj);
    console.log(Module2.obj);
  } catch (e) {
    ErrorLog.finalCatch({
      functionName: "start",
      error: e,
    });
  }
}
