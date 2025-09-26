import { use, useState } from "react";
import "./App.css";
//USAR BORDER COLLAPS

function App() {
  const [descricao, setDescricao] = useState("");
  const [quantidade, setQuantidade] = useState(0);
  const [valorUnitario, setValorUnitario] = useState(0);
  const [listaItem, setListaItem] = useState([]);

  const adicionarItem = () => {

    if (descricao.trim() === "") {
      alert("Informe uma Descrição");
      return;
    } else if(quantidade <= 0) {
      alert("Informe uma Quantidade");
      return;
    }else if(valorUnitario <= 0){
      alert("Informe um valor unitario");
      return;
    } else{
      console.log("funcionou")
    }

    const novoItem = {
      id: Date.now(),
      Descricao: descricao,
      Quantidade: quantidade,
      ValorUnitario: valorUnitario,
      total: quantidade * valorUnitario,
    };
    setListaItem([...listaItem, novoItem]);
  
  };

  const totalGeral = listaItem.reduce((acumulador, itemAtual) => {
    return acumulador + itemAtual.total;
  }, 0);

  const excluirItem = (id) => {
    setListaItem(listaItem.filter((item) => item.id != id));
  };

  return (
    <>
      <div className="quadro-orcamento">
        <h1>Orçamento</h1>

        <div className="input-container">
          <input
            id="descrição"
            type="text"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Descrição"
          />
          <input
            type="number"
            value={quantidade}
            onChange={(e) => setQuantidade(Number(e.target.value))}
            placeholder="Qtd"
          />
          <input
            type="number"
            value={valorUnitario}
            onChange={(e) => setValorUnitario(Number(e.target.value))}
            placeholder="Valor"
          />
          <button className="adicionar" onClick={adicionarItem}>
            +
          </button>
        </div>

        <table>
          <thead>
            <tr>
              <th className="descricao">Descrição</th>
              <th className="quantidade">Qtd</th>
              <th className="valor-unitario">Unitário</th>
              <th className="total">Total</th>
              <th className="acoes">Ações</th>
            </tr>
          </thead>
          <tbody>
            {listaItem.map((item) => (
              <tr key={item.id}>
                <td className="descricao">{item.Descricao}</td>
                <td className="quantidade">{item.Quantidade}</td>
                <td className="valor-unitario">R$ {item.ValorUnitario}</td>
                <td className="total">R$ {item.total}</td>
                <td className="acoes">
                  <button
                    onClick={() => excluirItem(item.id)}
                    className="excluir"
                  >
                    X
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th scope="row" colSpan="5"> {/* colSpan defina quantas culunas uma unica celula th deve ocupar nesse caso 5 */}
                Total Geral: R$ {totalGeral.toFixed(2)}
              </th>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
}

export default App;