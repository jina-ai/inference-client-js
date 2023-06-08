export interface DenseNDArray {
    buffer?: string;
    shape: number[];
    dtype: string;
}
export interface SparseNDArray {
    indices?: DenseNDArray;
    values?: DenseNDArray;
    shape: number[];
}

export interface NDArray {
    dense?: DenseNDArray;
    sparse?: SparseNDArray;
    cls_name: string;
    parameters?: { [k: string]: any; };
}

export interface Graph {
    adjacency?: NDArray;
    edge_features?: { [k: string]: any; };
    undirected: boolean;
}

export interface NamedScore {
    value: number;
    op_name: string;
    description: string;
    operands: NamedScore[];
    ref_id: string;
}

export interface Document {
    id: string;
    granularity?: number;
    adjacency?: number;
    parent_id?: string;
    buffer?: string;
    blob?: NDArray | string;
    text?: string;
    graph?: Graph;
    chunks?: Document[];
    weight?: number;
    matches?: Document[];
    uri?: string;
    mime_type?: string;
    tags?: { [k: string]: any; };
    location?: number[];
    offset?: number;
    embedding?: NDArray;
    scores?: { [k: string]: NamedScore; };
    modality?: string;
    evaluations?: { [k: string]: NamedScore; };
}

export interface DocumentArray<T extends Document = Document> extends Array<T> { }