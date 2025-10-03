// charts.js - canvas simples sem libs
document.addEventListener('DOMContentLoaded', () => {
  const resources = {labels:['Educação','Alimentação','Saúde','Admin'], values:[40,30,20,10]};
  const volunteers = {labels:['Jan','Fev','Mar','Abr','Mai','Jun'], values:[50,80,120,150,180,200]};
  const impact = {labels:['Norte','Nordeste','Sul','Sudeste','Centro-Oeste'], values:[10,25,15,40,10]};

  (function drawPie(){
    const c = document.getElementById('chart-resources');
    if (!c) return;
    const ctx = c.getContext('2d');
    const total = resources.values.reduce((a,b)=>a+b,0);
    let start = 0;
    for (let i=0;i<resources.values.length;i++){
      const slice = resources.values[i]/total * Math.PI*2;
      ctx.beginPath();
      ctx.moveTo(200,125);
      ctx.arc(200,125,90,start,start+slice);
      ctx.closePath();
      ctx.fillStyle = `hsl(${i*70},60%,60%)`;
      ctx.fill();
      start += slice;
    }
    ctx.fillStyle = '#000';
    ctx.font='12px sans-serif';
    let y=20;
    for (let i=0;i<resources.labels.length;i++){
      ctx.fillText(`${resources.labels[i]} — ${resources.values[i]}%`, 10, y);
      y+=16;
    }
  })();

  (function drawLine(){
    const c = document.getElementById('chart-volunteers');
    if (!c) return;
    const ctx = c.getContext('2d');
    const w = c.width, h = c.height;
    const max = Math.max(...volunteers.values);
    ctx.beginPath();
    ctx.moveTo(40,10); ctx.lineTo(40,h-20); ctx.lineTo(w-10,h-20); ctx.strokeStyle='#333'; ctx.stroke();
    ctx.beginPath();
    volunteers.values.forEach((v,i) => {
      const x = 40 + i*((w-60)/(volunteers.values.length-1));
      const y = h-20 - (v/max)*(h-60);
      if (i===0) ctx.moveTo(x,y);
      else ctx.lineTo(x,y);
      ctx.fillStyle='#222';
      ctx.fillRect(x-2,y-2,4,4);
      ctx.fillText(volunteers.labels[i], x-10, h-5);
    });
    ctx.strokeStyle='#0066cc'; ctx.stroke();
  })();

  (function drawBar(){
    const c = document.getElementById('chart-impact');
    if (!c) return;
    const ctx = c.getContext('2d');
    const w = c.width, h = c.height;
    const max = Math.max(...impact.values);
    const bw = (w-60)/impact.values.length;
    impact.values.forEach((v,i) => {
      const x = 40 + i*bw;
      const barH = (v/max)*(h-60);
      ctx.fillStyle = `hsl(${i*50},60%,50%)`;
      ctx.fillRect(x, h-20-barH, bw*0.7, barH);
      ctx.fillStyle='#000';
      ctx.fillText(impact.labels[i], x, h-5);
    });
  })();
});